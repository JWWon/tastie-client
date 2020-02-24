import React, {useState, useEffect} from 'react';
import {Animated, Keyboard, ViewStyle, Easing, Platform} from 'react-native';
import {useDispatch} from 'react-redux';

import BaseView from '@components/templates/BaseView';
import {updateKeyboardVisible} from '@store/actions/device';
import * as s from './KeyboardSafeView.style';

interface Props {
  style?: ViewStyle;
}

const KeyboardSafeView: React.FC<Props> = ({children, style}) => {
  const [marginTop] = useState(new Animated.Value(0));
  const dispatch = useDispatch();

  useEffect(() => {
    Keyboard.dismiss();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        if (Platform.OS === 'ios') {
          const {height} = e.endCoordinates;
          Animated.timing(marginTop, {
            toValue: -(height / 2),
            duration: 320,
            easing: Easing.inOut(Easing.quad),
          }).start();
        }
        dispatch(updateKeyboardVisible({keyboardVisible: true}));
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (Platform.OS === 'ios') {
          Animated.timing(marginTop, {
            toValue: 0,
            duration: 320,
            easing: Easing.inOut(Easing.quad),
          }).start();
        }
        dispatch(updateKeyboardVisible({keyboardVisible: false}));
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [marginTop, dispatch]);

  return (
    <BaseView noPaddingVertical={true}>
      <s.HideContainer onPress={Keyboard.dismiss}>
        <s.ContentWrapper as={Animated.View} style={[style, {marginTop}]}>
          {children}
        </s.ContentWrapper>
      </s.HideContainer>
    </BaseView>
  );
};

export default KeyboardSafeView;
