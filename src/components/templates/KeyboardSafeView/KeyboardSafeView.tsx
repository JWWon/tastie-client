import React, {useState, useEffect} from 'react';
import {Animated, Keyboard, ViewStyle, Easing, Platform} from 'react-native';
import {useDispatch} from 'react-redux';

import BaseView from '@components/templates/BaseView';
import {updateKeyboardVisible} from '@store/actions/device';
import * as s from './KeyboardSafeView.style';

interface Props {
  style?: ViewStyle;
}

const isIphone = Platform.OS === 'ios';

const KeyboardSafeView: React.FC<Props> = ({children, style}) => {
  const [marginTop] = useState(new Animated.Value(0));
  const dispatch = useDispatch();

  useEffect(() => {
    Keyboard.dismiss();

    const showEventName = isIphone ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardShowListener = Keyboard.addListener(showEventName, e => {
      if (isIphone) {
        const {height} = e.endCoordinates;
        Animated.timing(marginTop, {
          toValue: -(height / 2), // Keep content vertically center
          duration: 320,
          easing: Easing.inOut(Easing.quad),
        }).start();
      }
      dispatch(updateKeyboardVisible({keyboardVisible: true}));
    });

    const hideEventName = isIphone ? 'keyboardWillHide' : 'keyboardDidHide';
    const keyboardHideListener = Keyboard.addListener(hideEventName, () => {
      if (isIphone) {
        Animated.timing(marginTop, {
          toValue: 0,
          duration: 320,
          easing: Easing.inOut(Easing.quad),
        }).start();
      }
      dispatch(updateKeyboardVisible({keyboardVisible: false}));
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <BaseView noWrapper>
      <s.HideKeyboard>
        <s.ContentWrapper as={Animated.View} style={[style, {marginTop}]}>
          {children}
        </s.ContentWrapper>
      </s.HideKeyboard>
    </BaseView>
  );
};

export default KeyboardSafeView;
