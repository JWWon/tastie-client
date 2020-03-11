import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import firebase from '@react-native-firebase/app';

import {SCREEN, EVENT, MESSAGE} from '@utils/consts';
import {RootState} from '@store/reducers';
import {navigate} from '@utils/RootService';
import {logout} from '@store/actions/auth';
import size from '@styles/sizes';
import {clearAction, expandNavbar, contractNavbar} from '@store/actions/navbar';
import historyIcon from '@assets/images/icon-history/icon-history.png';
import catThinkingIcon from '@assets/images/icon-cat/icon-cat-thinking.png';
import profileIcon from '@assets/images/icon-profile/icon-profile.png';
import * as s from './TabBar.style';

const minBorderOpacity = 0.25;
const buttonSize = size.button.cat;

const getCatIcon = (thinking: boolean, message: string) => {
  if (thinking) return catThinkingIcon;

  switch (message) {
    case MESSAGE.POSITIVE:
    case MESSAGE.READY_TO_RECOMMEND:
      return require('@assets/images/icon-cat/icon-cat-happy.png');
    case MESSAGE.NEGATIVE:
    case MESSAGE.CANNOT_FIND_RECOMMENDATIONS:
    case MESSAGE.CANNOT_FIND_RESULTS:
    case MESSAGE.DISMISS_RECOMMENDATIONS:
      return require('@assets/images/icon-cat/icon-cat-sad.png');
    default:
      return require('@assets/images/icon-cat/icon-cat.png');
  }
};

const TabBar: React.FC = () => {
  const [opacity] = useState(new Animated.Value(0.25));
  const dispatch = useDispatch();
  const {
    loading,
    expand,
    showMessage,
    message,
    customAction,
    screenName,
  } = useSelector((state: RootState) => state.navbar);

  const isAlert = !loading && !!customAction;

  const isCurrentHistory = screenName === SCREEN.HISTORY;
  const isCurrentHome =
    screenName === SCREEN.CASE || screenName === SCREEN.RECOMMENDATIONS;
  const isCurrentProfile = screenName === SCREEN.PROFILE;

  const getIcon = () => {
    switch (screenName) {
      case SCREEN.HISTORY:
        return historyIcon;
      case SCREEN.CASE:
      case SCREEN.RECOMMENDATIONS:
        return getCatIcon(loading || !showMessage, message);
      case SCREEN.PROFILE:
        return profileIcon;
    }
  };

  const glow = Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 800,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: minBorderOpacity,
        duration: 800,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }),
    ]),
  );

  const handlePress = () => {
    if (customAction) {
      customAction();
      dispatch(clearAction());
    } else {
      dispatch(expandNavbar());
    }
    firebase.analytics().logEvent(EVENT.PRESS_TABBAR, {
      message: showMessage ? message : 'no_message',
    });
  };

  const handleNavigate = (name: string, active: boolean) => {
    if (!active) {
      navigate(name);
      dispatch(contractNavbar());
    }
  };

  useEffect(() => {
    if (isAlert) {
      glow.start();
    } else {
      glow.stop();
      opacity.setValue(minBorderOpacity);
    }
  }, [isAlert]);

  return (
    <s.RoundBox style={{width: expand ? buttonSize * 3 : buttonSize}}>
      <s.ButtonBorder
        as={Animated.View}
        alertMode={isAlert}
        style={{opacity}}
      />
      {expand ? (
        <>
          <s.Button
            onPress={() => handleNavigate(SCREEN.HISTORY, isCurrentHistory)}>
            <s.Icon currentScreen={isCurrentHistory} source={historyIcon} />
          </s.Button>
          <s.Button onPress={() => handleNavigate(SCREEN.CASE, isCurrentHome)}>
            <s.Icon currentScreen={isCurrentHome} source={catThinkingIcon} />
          </s.Button>
          <s.Button onPress={() => dispatch(logout())}>
            <s.Icon currentScreen={isCurrentProfile} source={profileIcon} />
          </s.Button>
        </>
      ) : (
        <s.Button onPress={handlePress}>
          <s.Icon currentScreen={true} source={getIcon()} />
        </s.Button>
      )}
    </s.RoundBox>
  );
};

export default TabBar;
