import styled from 'styled-components/native';

import RawHome from '@components/templates/Home';

export const Home = styled(RawHome)`
  justify-content: center;
`;

const space = 12;
export const MoreSentenceWrapper = styled.View`
  margin: ${space}px -${({theme}) => theme.size.templatePadding}px 0;
  padding: ${space}px ${({theme}) => theme.size.templatePadding}px;
  background: #efefef;
`;
