import styled from 'styled-components/native';

export const Content = styled.Text`
  ${({theme}) => theme.font.content}
`;

export const Keyword = styled.Text`
  ${({theme}) => theme.font.size24}
  color: ${({theme}) => theme.color.black};
`;
