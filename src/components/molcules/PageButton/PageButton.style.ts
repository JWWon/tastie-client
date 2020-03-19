import styled from 'styled-components/native';

import {Family} from '@styles/fonts';
import {shadow} from '@styles/mixins';
import {Props} from './PageButton.type';

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

type BubbleProps = Pick<Props, 'disabled'>;

const selectBgColor = ({theme, disabled}: any) =>
  disabled ? theme.color.white : theme.color.blue;
const borderSize = 1;

export const MessageBubble = styled.TouchableOpacity.attrs({
  activeOpacity: 0.92,
})<BubbleProps>`
  border-radius: ${({theme}) => theme.size.border.basic}px;
  ${shadow}
`;

export const TextBox = styled.View<BubbleProps>`
  background: ${selectBgColor};
  border: ${borderSize}px solid ${({theme}) => theme.color.blackBorder};
  border-radius: ${({theme}) => theme.size.border.basic}px;
  padding: 12px 16px;
`;

export const LeftWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Message = styled.Text<BubbleProps>`
  font-size: 14px;
  font-family: ${({disabled}) =>
    disabled ? Family.NanumSquare.R : Family.NanumSquare.B};
  color: ${({theme, disabled}) =>
    disabled ? theme.color.blackMild : theme.color.white};
`;
