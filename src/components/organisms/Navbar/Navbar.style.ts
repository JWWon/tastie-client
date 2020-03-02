import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {VibrancyView} from '@react-native-community/blur';

// Only for iOS
export const ModalBlur = styled(VibrancyView).attrs({
  blurType: 'dark',
  blurAmount: 4,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ModalTouch = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${Platform.OS === 'android' && 'background: rgba(49, 49, 49, 0.8);'}
`;

export const ModalSafeView = styled.SafeAreaView`
  padding-top: ${({theme}) => theme.space.rootTop}px;
`;

export const Wrapper = styled.SafeAreaView`
  position: absolute;
  left: 0;
  bottom: ${({theme}) => theme.space.rootBottom}px;
  width: 100%;
  align-items: center;
`;
