import styled from 'styled-components/native';

import RawFading from '@components/atoms/Fading';

export const Fading = styled(RawFading).attrs(props => ({
  paddingVertical: props.theme.size.verticalPadding / 2,
}))``;
