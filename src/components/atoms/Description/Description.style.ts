import styled from 'styled-components/native';

import {Family} from '@styles/fonts';

export const Wrapper = styled.View`
  flex-direction: row;
`;

export const Link = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const Message = styled.Text`
  ${({theme}) => theme.font.size12}
  margin-top: ${({theme}) => theme.space.narrow}px;
  color: ${({theme}) => theme.color.grayDark};
`;

export const LinkMessage = styled(Message)`
  font-family: ${Family.NanumSquare.B};
  color: ${({theme}) => theme.color.blue};
  text-decoration: underline solid ${({theme}) => theme.color.blue};
`;
