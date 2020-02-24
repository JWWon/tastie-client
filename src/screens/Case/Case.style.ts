import styled from 'styled-components/native';

import KeyboardSafeView from '@components/templates/KeyboardSafeView';

export const Container = styled(KeyboardSafeView)`
  justify-content: center;
`;

const space = 12;
export const MoreSentenceWrapper = styled.View`
  margin: ${space}px -${({theme}) => theme.space.rootHorizontal}px 0;
  padding: ${space}px ${({theme}) => theme.space.rootHorizontal}px;
  background: #efefef;
`;
