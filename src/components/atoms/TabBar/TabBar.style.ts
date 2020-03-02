import styled from 'styled-components/native';

import {shadow} from '@styles/mixins';

export const RoundBox = styled.View`
  height: ${({theme}) => theme.size.button.cat}px;
  border-radius: ${({theme}) => theme.size.button.cat / 2}px;
  background: ${({theme}) => theme.color.white};
  flex-direction: row;
  ${shadow}
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface BorderProps {
  alertMode: boolean;
}

export const ButtonBorder = styled.View<BorderProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  border-width: 1px;
  border-radius: ${({theme}) => theme.size.button.cat / 2}px;
  border-color: ${({alertMode, theme}) =>
    alertMode ? theme.color.blue : '#bcbcbc'};
  opacity: 0.25;
  align-items: center;
  justify-content: center;
`;

interface IconProps {
  currentScreen: boolean;
}

const catSize = 0.56; // relative size
export const Icon = styled.Image.attrs({
  resizeMode: 'contain',
})<IconProps>`
  width: ${({theme}) => theme.size.button.cat * catSize}px;
  height: ${({theme}) => theme.size.button.cat * catSize}px;
  opacity: ${({currentScreen}) => (currentScreen ? 1 : 0.25)};
`;
