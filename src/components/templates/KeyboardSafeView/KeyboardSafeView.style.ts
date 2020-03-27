import styled from 'styled-components/native';
import {Keyboard} from 'react-native';

export const HideKeyboard = styled.TouchableWithoutFeedback.attrs({
  onPress: Keyboard.dismiss,
})`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  padding-top: ${({theme}) => theme.space.rootTop}px;
  padding-bottom: ${({theme}) =>
    theme.size.button.tabbar + theme.space.rootBottom}px;
`;
