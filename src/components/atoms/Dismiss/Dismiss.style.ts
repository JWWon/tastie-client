import styled from 'styled-components/native';

import {shadow} from '@styles/mixins';
import {Props} from './Dismiss.type';

type WrapperInterface = Pick<Props, 'icon'>;

const Wrapper = styled.View<WrapperInterface>`
  width: 100%;
  align-items: ${({icon}) => (icon === 'arrow' ? 'flex-start' : 'center')};
  padding-bottom: ${({theme}) => theme.space.wide}px;
`;

export const WrapperRelative = styled(Wrapper)``;
export const WrapperAbsolute = styled(Wrapper)`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-top: ${({theme}) => theme.space.basic}px;
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
