import styled from 'styled-components/native';

export const FullScreen = styled.View`
  flex: 1;
  padding: 0 ${props => props.theme.size.templatePadding}px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  padding: 24px 0;
`;

export const NavbarArea = styled.View`
  height: ${({theme}) => theme.size.navButton + theme.size.verticalPadding}px;
`;
