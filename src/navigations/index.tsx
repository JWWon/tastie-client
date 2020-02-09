import React, {useRef} from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {clearCase} from '@store/actions/case';
import consts from '@utils/consts';
import HomeNavigator from './Home';

const {SCREEN} = consts;

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

      // TODO: set firebase anayltics
      console.log(`Route changed to '${name}'!`);

      // MIDDLEWARE
      switch (name) {
        case SCREEN.CASE:
          dispatch(clearCase());
          break;
      }
    }
  }

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      <HomeNavigator />
    </NavigationContainer>
  );
};
