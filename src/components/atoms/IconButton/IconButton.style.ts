import styled from 'styled-components/native';

import {Props} from './IconButton.type';
import {Family} from '@styles/fonts';

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
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
