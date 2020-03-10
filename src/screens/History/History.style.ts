import styled from 'styled-components/native';

import RawTextHighlight from '@components/atoms/TextHighlight';

export const Container = styled.View`
  flex: 1;
  margin: 0 ${({theme}) => theme.space.rootHorizontal}px;
`;

export const HeaderWrapper = styled.SafeAreaView``;

export const TextHighlight = styled(RawTextHighlight)`
  padding: ${({theme}) => `${theme.space.rootTop}px 0 ${theme.space.wide}px`};
`;
