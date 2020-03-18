import styled from 'styled-components/native';

// TODO: Add Blur backround

export const ModalTouch = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(49, 49, 49, 0.7);
`;

export const ModalSafeView = styled.SafeAreaView`
  padding-top: ${({theme}) => theme.space.rootTop}px;
`;
