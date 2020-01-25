import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  margin: 0 24px; /* !important View is not FullSize */
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
