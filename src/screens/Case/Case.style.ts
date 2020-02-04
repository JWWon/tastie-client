import styled from 'styled-components/native';

import RawHome from '@components/templates/Home';

export const Home = styled(RawHome).attrs({
  justifyContent: 'center',
})``;

export const MoreSentenceWrapper = styled.View`
  margin: ${({theme}) => theme.size.verticalPadding / 2}px -${({theme}) =>
      theme.size.templatePadding}px 0;
  margin-top: ${({theme}) => theme.size.verticalPadding / 2}px;
  padding: ${({theme}) => theme.size.verticalPadding / 2}px
    ${({theme}) => theme.size.templatePadding}px;
  background: #efefef;
`;
