import styled from 'styled-components/native';

import {Family} from '@styles/fonts';

interface MessageProps {
  alertMode: boolean;
}

export const Container = styled.View``;

export const Bubble = styled.View`
  align-items: center;
`;

const borderWidth = 1;
export const Square = styled.View<MessageProps>`
  background: ${({theme, alertMode: alert}) =>
    alert ? theme.color.blue : theme.color.white};
  border: ${borderWidth}px solid ${({theme}) => theme.color.blackBorder};
  border-radius: ${({theme}) => theme.size.border.basic}px;
  width: 100%;
  padding: 12px 16px;
`;

interface SpaceProps {
  height: number;
}

export const BottomSpace = styled.View<SpaceProps>`
  height: ${({height}) => height + 4}px;
`;

export const Content = styled.Text<MessageProps>`
  font-size: 14px;
  font-family: ${({alertMode: alert}) =>
    alert ? Family.NanumSquare.B : Family.NanumSquare.R};
  color: ${({theme, alertMode: alert}) =>
    alert ? theme.color.white : theme.color.blackMild};
`;
