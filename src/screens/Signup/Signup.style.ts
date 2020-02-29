import styled from 'styled-components/native';

import {Family} from '@styles/fonts';

export const Agreement = styled.Text`
  ${({theme}) => theme.font.size10}
  color: ${({theme}) => theme.color.grayDark};
  padding-right: ${({theme}) => theme.space.wide}px;
  line-height: 16px;
`;

export const Link = styled.Text`
  font-family: ${Family.NanumSquare.B};
  color: ${({theme}) => theme.color.black};
  text-decoration: underline;
`;
