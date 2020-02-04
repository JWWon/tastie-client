import styled from 'styled-components/native';

import RawFading from '@components/atoms/Fading';

export const Fading = styled(RawFading)`
  padding: ${({theme}) => theme.size.verticalPadding / 2}px 0;
`;
