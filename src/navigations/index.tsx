import '@react-native-firebase/analytics';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import {GoogleSignin} from '@react-native-community/google-signin';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';

import axios from '@services/axios.base';
import {clearCase} from '@store/actions/case';
import {checkKeychain} from '@store/actions/auth';
import {updateScreenName} from '@store/actions/navbar';
import {SCREEN} from '@utils/consts';
import {RootState} from '@store/reducers';
import {GOOGLE_WEB_CLIENT} from '@utils/env';
import RootNavigator from './Root';
import SessionNavigator from './Session';

function configFirebase() {
  const uuid = DeviceInfo.getUniqueId();
  firebase.analytics().setAnalyticsCollectionEnabled(!__DEV__);
  firebase.analytics().setUserId(uuid);
}

function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
): string {
  if (state.routes === undefined || state.index === undefined) return '';

  const route = state.routes[state.index];
  if (route.state) return getActiveRouteName(route.state);
  return route.name;
}

export default () => {
  const dispatch = useDispatch();
  const {screenName} = useSelector((state: RootState) => state.navbar);
  const {status} = useSelector((state: RootState) => state.auth);

  function __init__() {
    // Axios
    axios.config();
    // Firebase
    configFirebase();
    // Social Login
    GoogleSignin.configure({webClientId: GOOGLE_WEB_CLIENT});
    // Check Keychain
    dispatch(checkKeychain.request());
  }

  function handleStateChange(state?: NavigationState) {
    if (!state) return;

    const name = getActiveRouteName(state);
    if (!screenName || screenName !== name) {
      dispatch(updateScreenName(name));
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
      case 'USER_EXIST':
        return <RootNavigator />;
      case 'NO_USER':
        return <SessionNavigator />;
    }
  }

  useEffect(__init__, []);

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      {renderNavigator()}
    </NavigationContainer>
  );
};
