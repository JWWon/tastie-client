import styled, {css} from 'styled-components/native';

import {Props} from './IconButton.type';
import {Family} from '@styles/fonts';

const buttonStyle = css`
  flex-direction: row;
  align-items: center;
`;

type ButtonProps = Pick<Props, 'extraSpace'>;
export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<ButtonProps>`
  ${buttonStyle}
  ${({extraSpace, theme}) =>
    extraSpace
      ? `padding: ${theme.space.basic}px;
         margin: -${theme.space.basic}px`
      : ''}
`;

export const Wrapper = styled.View`
  ${buttonStyle}
`;

export const Icon = styled.Image`
  height: 18px; /* default height */
`;

// Text
export const Message = styled.Text`
  ${({theme}) => theme.font.size12}
  font-family: ${Family.NanumSquare.B};
  color: ${({theme}) => theme.color.black};
  margin-left: 8px;
`;
