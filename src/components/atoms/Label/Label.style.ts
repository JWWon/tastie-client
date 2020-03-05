import styled from 'styled-components/native';

import {Props} from './Label';
import {Family} from '@styles/fonts';

export const Label = styled.Text<Props>`
  ${({theme}) => theme.font.size12}
  font-family: ${Family.NanumSquare.B};
  color: ${({theme, color}) => color || theme.color.black};
  padding: 4px ${({theme}) => theme.size.border.basic / 2}px;
  border-radius: ${({theme}) => theme.size.border.basic}px;
  border: 1px solid ${({theme, color}) => color || theme.color.black};
  margin-right: 8px;
`;
