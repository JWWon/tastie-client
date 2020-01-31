import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 ${props => props.theme.size.templatePadding}px;
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const ContentFull = styled.View`
  flex: 1;
`;

export const ContentFit = styled(ContentFull)`
  justify-content: center;
`;

export const NavWrapper = styled.View`
  padding: 4px 0 8px;
`;
