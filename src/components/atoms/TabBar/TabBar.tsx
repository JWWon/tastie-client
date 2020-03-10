import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {SCREEN} from '@utils/consts';
import {RootState} from '@store/reducers';
import {navigate} from '@utils/RootService';
import {logout} from '@store/actions/auth';
import size from '@styles/sizes';
import {clearAction, expandNavbar, contractNavbar} from '@store/actions/navbar';
import historyIcon from '@assets/images/icon-history/icon-history.png';
import catIcon from '@assets/images/icon-cat/icon-cat.png';
import closeMouthCatIcon from '@assets/images/icon-cat-no-mouth/icon-cat-no-mouth.png';
import profileIcon from '@assets/images/icon-profile/icon-profile.png';
import * as s from './TabBar.style';

const minBorderOpacity = 0.25;
const buttonSize = size.button.cat;

const TabBar: React.FC = () => {
  const [opacity] = useState(new Animated.Value(0.25));
  const dispatch = useDispatch();
  const {loading, expand, showMessage, customAction, screenName} = useSelector(
    (state: RootState) => state.navbar,
  );

  const isAlert = !loading && !!customAction;
  const isTalking = !loading && showMessage;

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
        return isTalking ? catIcon : closeMouthCatIcon;
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
            <s.Icon currentScreen={isCurrentHome} source={closeMouthCatIcon} />
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
