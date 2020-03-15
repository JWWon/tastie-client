import '@react-native-firebase/analytics';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import _ from 'lodash';
import firebase from '@react-native-firebase/app';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useDispatch, useSelector} from 'react-redux';

import axios from '@services/axios.base';
import {checkKeychain} from '@store/actions/auth';
import {
  updateScreenName,
  updateMessage,
  hideMessage,
  showMessage,
} from '@store/actions/navbar';
import {clearCase} from '@store/actions/case';
import {
  getRecommendations,
  clearRecommendations,
} from '@store/actions/recommendations';
import {SCREEN, MESSAGE} from '@utils/consts';
import {RootState} from '@store/reducers';
import {GOOGLE_WEB_CLIENT} from '@utils/env';
import {handleLinkDetailScreen} from '@utils/dynamicLink';
import {navigate as navigateSession} from '@utils/SessionService';
import {navigate as navigateRoot} from '@utils/RootService';
import LikesModal from '@components/organisms/LikesModal';
import Splash from '@components/atoms/Splash';
import RootNavigator from './Root';
import SessionNavigator from './Session';

function configFirebase() {
  firebase.analytics().setAnalyticsCollectionEnabled(!__DEV__);
  firebase.analytics().logAppOpen();
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
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const {status} = useSelector((state: RootState) => state.auth);
  const {screenName: prevName} = useSelector(
    (state: RootState) => state.navbar,
  );

  function init() {
    // Axios
    axios.config();
    // Firebase
    configFirebase();
    // Social Login
    GoogleSignin.configure({webClientId: GOOGLE_WEB_CLIENT});
    // Check Keychain
    dispatch(checkKeychain.request());
  }

  function stateChangeMiddleware(name: string) {
    // HANDLE_RECOMMENDATIONS
    if (prevName === SCREEN.CASE && name === SCREEN.RECOMMENDATIONS) {
      dispatch(getRecommendations.request());
    }
    if (
      prevName === SCREEN.RECOMMENDATIONS &&
      name !== SCREEN.RECOMMENDATION_DETAIL
    ) {
      if (name === SCREEN.CASE) {
        dispatch(updateMessage({message: MESSAGE.DISMISS_RECOMMENDATIONS}));
      }
      dispatch(clearRecommendations.request());
    }
    // END HANDLE_RECOMMENDATIONS

    // CLEAR_CASE
    if (
      name === SCREEN.CASE &&
      _.includes(
        ['', SCREEN.WELCOME, SCREEN.LOGIN, SCREEN.SIGNUP_META],
        prevName,
      )
    ) {
      dispatch(clearCase());
    }
    // END CLEAR_CASE

    // HANDLE_MESSAGE
    switch (name) {
      case SCREEN.CASE:
      case SCREEN.RECOMMENDATIONS:
        dispatch(showMessage());
        break;
      case SCREEN.RECOMMENDATION_DETAIL:
      case SCREEN.HISTORY:
      case SCREEN.PROFILE:
        dispatch(hideMessage());
        break;
    }
    // END HANDLE_MESSAGE
  }

  function handleStateChange(state?: NavigationState) {
    if (!state) return;

    const name = getActiveRouteName(state);
    if (!prevName || prevName !== name) {
      dispatch(updateScreenName(name));
      // SEND SCREEN NAME TO ANALYTICS
      firebase.analytics().setCurrentScreen(name, name);
      // MIDDLEWARE
      stateChangeMiddleware(name);
    }
  }

  function renderNavigator() {
    switch (status) {
      case 'PENDING':
        return <Splash />;
      case 'USER_EXIST':
        return <RootNavigator />;
      case 'NO_USER':
        return <SessionNavigator />;
    }
  }

  useEffect(() => {
    init();
    const unsubscribe = dynamicLinks().onLink(
      (link: FirebaseDynamicLinksTypes.DynamicLink) => {
        const navigate =
          status === 'USER_EXIST' ? navigateRoot : navigateSession;
        handleLinkDetailScreen(link.url, navigate);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      {renderNavigator()}
      <LikesModal />
    </NavigationContainer>
  );
};
