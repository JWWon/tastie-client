import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const SafeAreaView = styled.SafeAreaView`
  margin: 0 ${({theme}) => theme.space.rootHorizontal}px;
`;

export const SafeAreaBottom = styled.SafeAreaView`
  margin: ${({theme}) =>
    `auto ${theme.space.rootHorizontal}px ${theme.space.rootBottom}px`};
`;

export const MenuWrapper = styled.View`
  height: ${({theme}) => theme.size.button.tabbar}px;
  border-radius: ${({theme}) => theme.size.button.tabbar / 2}px;
  background: ${({theme}) => theme.color.white};
  overflow: hidden;
`;
