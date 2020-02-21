import React, {useRef, useEffect} from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import {useDispatch} from 'react-redux';

import {clearCase} from '@store/actions/case';
import {SCREEN} from '@utils/consts';
import HomeNavigator from './Home';

export default () => {
  const routeNameRef = useRef<string>();
  const dispatch = useDispatch();

  function handleStateChange(state?: NavigationState) {
    if (!state) {
      return;
    }

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

  useEffect(() => {
    // SEND FIRST SCREEN NAME TO ANALYTICS
    firebase.analytics().setCurrentScreen(SCREEN.CASE, SCREEN.CASE);
  }, []);

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      <HomeNavigator />
    </NavigationContainer>
  );
};
