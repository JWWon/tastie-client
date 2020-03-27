import styled from 'styled-components/native';

import {Family} from '@styles/fonts';

export const Wrapper = styled.View`
  flex: 1;
`;

export const Icon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 12px;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  ${({theme}) => theme.font.size10}
  font-family: ${Family.NanumSquare.B};
  color: ${({theme}) => theme.color.grayLight};
  margin-bottom: 8px;
`;

export const Data = styled.Text`
  ${({theme}) => theme.font.size12}
  font-family: ${Family.NanumSquare.EB};
  color: ${({theme}) => theme.color.blackMild};
`;
