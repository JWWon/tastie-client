import styled from 'styled-components/native';

import ImageButton from '@components/atoms/ImageButton';

// View
export const Container = styled.View`
  flex: 1;
  margin: 32px 0 49px;
`;

export const InfoWrapper = styled.View`
  flex: 1;
  margin-top: -${({theme}) => theme.size.placeCardHover}px;
  background: ${({theme}) => theme.color.white};
  border-radius: ${({theme}) => theme.size.roundBorder}px;
  padding: 12px 16px;
  /* shadow */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;

export const Dismiss = styled(ImageButton)`
  position: absolute;
  top: 16px;
  right: 0;
`;
