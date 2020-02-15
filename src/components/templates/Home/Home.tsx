import React, {useState, useEffect} from 'react';
import {
  Animated,
  Keyboard,
  LayoutChangeEvent,
  ViewStyle,
  Easing,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {updateHomeHeight, updateKeyboardVisible} from '@store/actions/device';
import * as s from './Home.style';

interface Props {
  style?: ViewStyle;
}

const Template: React.FC<Props> = ({children, style}) => {
  const [marginTop] = useState(new Animated.Value(0));
  const dispatch = useDispatch();

  function layoutDidMount(e: LayoutChangeEvent) {
    const {height: homeHeight} = e.nativeEvent.layout;
    dispatch(updateHomeHeight({homeHeight}));
  }

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
    <s.FullScreen>
      <s.Container>
        <s.HideContainer onPress={Keyboard.dismiss}>
          <s.ContentWrapper
            as={Animated.View}
            onLayout={layoutDidMount}
            style={[style, {marginTop}]}>
            {children}
          </s.ContentWrapper>
        </s.HideContainer>
      </s.Container>
    </s.FullScreen>
  );
};

export default Template;
