import styled from 'styled-components/native';
import {
  Pager as RawPager,
  iPageInterpolation,
} from '@crowdlinker/react-native-pager';
import LinearGradient from 'react-native-linear-gradient';
import {ViewStyle} from 'react-native';

import space from '@styles/spaces';

export const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.color.grayLight};
`;

const inlineCardsConfig: iPageInterpolation = {
  opacity: {
    inputRange: [-1, 0, 1],
    outputRange: [0.7, 1, 0.7],
  },
};

export const Pager = styled(RawPager).attrs({
  pageInterpolation: inlineCardsConfig,
  adjacentChildOffset: 1,
})`
  flex: 1;
  overflow: hidden;
`;

export const Card = styled.View`
  flex: 1;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
`;

export const Filter = styled(LinearGradient).attrs({
  colors: [
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0)',
    'rgba(0,0,0,0.1)',
    'rgba(0, 0, 0, 0.3)',
  ],
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

// PAGINATION
interface DotInterface {
  active: boolean;
}

export const dotSize = 6;

export const pagination: ViewStyle = {
  position: 'absolute',
  bottom: space.narrow,
  height: dotSize,
};

export const DotWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.View<DotInterface>`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: ${dotSize / 2}px;
  background: ${({active, theme}) =>
    active ? theme.color.blue : theme.color.white};
`;
// END PAGINATION
