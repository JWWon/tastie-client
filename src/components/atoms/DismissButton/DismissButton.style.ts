import styled from 'styled-components/native';

import {shadow} from '@styles/mixins';

export const Wrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.size.button.dismiss}px;
  height: ${({theme}) => theme.size.button.dismiss}px;
  border-radius: ${({theme}) => theme.size.button.dismiss / 2}px;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.color.white};
  ${shadow}
`;

export const Icon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 33.3%;
  height: 33.3%;
`;
