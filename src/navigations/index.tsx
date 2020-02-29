import '@react-native-firebase/analytics';
import React, {useRef, useEffect} from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';

import axios from '@services/axios.base';
import {clearCase} from '@store/actions/case';
import {checkKeychain} from '@store/actions/auth';
import {SCREEN} from '@utils/consts';
import {RootState} from '@store/reducers';
import HomeNavigator from './Home';
import SessionNavigator from './Session';

function configFirebase() {
  const uuid = DeviceInfo.getUniqueId();
  firebase.analytics().setAnalyticsCollectionEnabled(true);
  firebase.analytics().setUserId(uuid);
}

export default () => {
  const routeNameRef = useRef<string>();
  const dispatch = useDispatch();
  const {status} = useSelector((state: RootState) => state.auth);

  function handleStateChange(state?: NavigationState) {
    if (!state) return;

    const prevName = routeNameRef.current;
    const {name} = state.routes[state.index];
    if (prevName !== name) {
      routeNameRef.current = name;
      // SEND SCREEN NAME TO ANALYTICS
      firebase.analytics().setCurrentScreen(name, name);
      // MIDDLEWARE
      switch (name) {
        case SCREEN.CASE:
          dispatch(clearCase());
          break;
      }
    }
  }

  function renderNavigator() {
    switch (status) {
      case 'PENDING':
        // TODO: Apply Splash Image when pending
        return null;
      case 'SUCCESS':
        return <HomeNavigator />;
      case 'FAILURE':
        return <SessionNavigator />;
    }
  }

  // INITIALIZER
  useEffect(() => {
    // Config
    axios.config();
    configFirebase();
    // Check Keychain
    dispatch(checkKeychain.request());
  }, []);

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      {renderNavigator()}
    </NavigationContainer>
  );
};
