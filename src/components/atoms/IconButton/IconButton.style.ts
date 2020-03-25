import styled from 'styled-components/native';

import {Props} from './IconButton.type';
import {Family} from '@styles/fonts';

type ButtonProps = Pick<Props, 'extraSpace'>;
export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<ButtonProps>`
  flex-direction: row;
  align-items: center;
  ${({extraSpace, theme}) =>
    extraSpace
      ? `padding: ${theme.space.basic}px;
         margin: -${theme.space.basic}px`
      : ''}
`;

export const Icon = styled.Image`
  height: 18px; /* default height */
`;

// Text
type MessageProps = Pick<Props, 'messageColor'>;
export const Message = styled.Text<MessageProps>`
  ${({theme}) => theme.font.size12}
  font-family: ${Family.NanumSquare.B};
  color: ${({theme, messageColor}) => messageColor || theme.color.black};
  margin-left: 8px;
`;
