import styled from 'styled-components/native';

import ImageButton from '@components/atoms/ImageButton';
import {shadow} from '@styles/mixins';

// View
const paddingTop = 24;
export const Container = styled.View`
  flex: 1;
  padding: ${paddingTop}px 0 16px;
`;

export const InfoWrapper = styled.View`
  margin-top: -${({theme}) => theme.size.placeCardHover}px;
  background: ${({theme}) => theme.color.white};
  border-radius: ${({theme}) => theme.size.border.basic}px;
  padding: 16px;
  ${shadow}
`;

export const Dismiss = styled(ImageButton)`
  position: absolute;
  top: ${paddingTop + 16}px;
  right: 0;
`;
