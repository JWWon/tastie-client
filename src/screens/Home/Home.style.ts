import styled from 'styled-components/native';

export const MoreSentenceWrapper = styled.View`
  margin: ${({theme}) => theme.size.verticalPadding / 2}px -${({theme}) =>
      theme.size.templatePadding}px 0;
  margin-top: ${({theme}) => theme.size.verticalPadding / 2}px;
  padding: ${({theme}) => theme.size.verticalPadding / 2}px
    ${({theme}) => theme.size.templatePadding}px;
  background: #efefef;
`;
