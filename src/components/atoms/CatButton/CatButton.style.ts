import styled from 'styled-components/native';

import {shadow} from '@styles/mixins';

export const Button = styled.TouchableOpacity`
  width: ${({theme}) => theme.size.button.cat}px;
  height: ${({theme}) => theme.size.button.cat}px;
  border-radius: ${({theme}) => theme.size.button.cat / 2}px;
  background: #ffffff;
  ${shadow}
`;

interface BorderProps {
  alert: boolean;
}

export const ButtonBorder = styled.View<BorderProps>`
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-radius: ${({theme}) => theme.size.button.cat / 2}px;
  background: transparent;
  border-color: ${({alert, theme}) => (alert ? theme.color.blue : '#bcbcbc')};
  opacity: 0.25;

  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const catSize = 0.56; // relative size
export const IconCat = styled.Image.attrs(() => ({
  source: require('@assets/images/icon-cat/icon-cat.png'),
  resizeMode: 'contain',
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -${({theme}) => theme.size.button.cat * (catSize / 2)}px 0 0 -${({
      theme,
    }) => theme.size.button.cat * (catSize / 2)}px;
  width: ${({theme}) => theme.size.button.cat * catSize}px;
  height: ${({theme}) => theme.size.button.cat * catSize}px;
`;
