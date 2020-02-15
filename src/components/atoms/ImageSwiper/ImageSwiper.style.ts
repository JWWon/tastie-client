import styled from 'styled-components/native';
import {
  Pager as RawPager,
  Pagination as RawPagination,
} from '@crowdlinker/react-native-pager';
import {ViewStyle} from 'react-native';

import sizes from '@styles/sizes';

export const Container = styled.View`
  width: 100%;
  flex: 1;
`;

export const Pager = styled(RawPager)`
  flex: 1;
  overflow: hidden;
  border-radius: ${({theme}) => theme.size.roundBorder}px;
`;

export const Card = styled.View`
  flex: 1;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
`;

export const Filter = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(49, 49, 49, 0.3);
`;

// PAGINATION
interface DotInterface {
  active: boolean;
}

export const Pagination = styled(RawPagination)`
  margin-top: -20px;
  width: 40%;
  height: 10px;
  align-self: center;
`;

export const DotWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const dotSize = 10;
export const Dot = styled.View<DotInterface>`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: ${dotSize / 2}px;
  background: ${({active, theme}) =>
    active ? theme.color.blue : theme.color.white};
`;

export const pagination: ViewStyle = {
  height: dotSize,
  position: 'absolute',
  bottom: sizes.placeCardHover + 8,
};
// END PAGINATION
