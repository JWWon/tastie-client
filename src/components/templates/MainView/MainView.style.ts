import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  /* !imp View is not FullSize */
  flex: 1;
  margin: 0 ${props => props.theme.size.templatePadding}px;
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
