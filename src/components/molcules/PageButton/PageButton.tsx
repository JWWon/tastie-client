import React, {useEffect, useState} from 'react';
import {Platform, Keyboard, Animated, Easing} from 'react-native';

import Triangle from '@components/atoms/Triangle';
import space from '@styles/spaces';
import {Props} from './PageButton.type';
import * as s from './PageButton.style';

const animateOptions = {
  duration: 320,
  easing: Easing.bezier(0.25, 0.72, 0.66, 0.93),
};

const PageButton: React.FC<Props> = ({
  message,
  onPress,
  disabled,
  renderLeft,
}) => {
  const [bottom] = useState(new Animated.Value(0));

  useEffect(() => {
    // Only for iOS
    if (Platform.OS === 'ios') {
      const keyboardShowListener = Keyboard.addListener(
        'keyboardWillShow',
        e => {
          const {height} = e.endCoordinates;
          Animated.timing(bottom, {
            toValue: height + space.basic - space.notchBottom,
            ...animateOptions,
          }).start();
        },
      );

      const keyboardHideListener = Keyboard.addListener(
        'keyboardWillHide',
        () => {
          Animated.timing(bottom, {
            toValue: 0,
            ...animateOptions,
          }).start();
        },
      );

      return () => {
        keyboardShowListener.remove();
        keyboardHideListener.remove();
      };
    }
  }, []);

  return (
    <s.Wrapper as={Animated.View} style={{bottom}}>
      <s.LeftWrapper>{renderLeft}</s.LeftWrapper>
      <s.MessageBubble onPress={onPress} disabled={disabled}>
        <s.TextBox disabled={disabled}>
          <s.Message disabled={disabled}>{message}</s.Message>
        </s.TextBox>
        <Triangle point="right" active={!disabled} width={14} height={10} />
      </s.MessageBubble>
    </s.Wrapper>
  );
};

export default PageButton;
