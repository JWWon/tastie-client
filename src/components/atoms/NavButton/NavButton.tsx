import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import {useSelector} from 'react-redux';

import * as s from './NavButton.style';
import {RootState} from '@store/reducers';

const NavButton: React.FC = () => {
  const {onPress, loading} = useSelector((state: RootState) => state.message);
  const [opacity] = useState(new Animated.Value(0.25));

  const alert = onPress !== undefined && !loading;

  const glow = Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 800,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.25,
        duration: 800,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }),
    ]),
  );

  useEffect(() => {
    if (alert) {
      glow.start();
    } else {
      glow.stop();
      opacity.setValue(0.25);
    }
  });

  glow.start();

  return (
    <s.Button onPress={onPress}>
      <s.ButtonBorder as={Animated.View} alert={alert} style={{opacity}} />
      <s.IconCat />
    </s.Button>
  );
};

export default NavButton;
