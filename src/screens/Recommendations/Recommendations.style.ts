import styled from 'styled-components/native';
import {
  Pager as RawPager,
  iPageInterpolation,
} from '@crowdlinker/react-native-pager';

interface PagerCustomProps {
  messageHeight: number;
}

const inlineCardsConfig: iPageInterpolation = {
  opacity: {
    inputRange: [-1, 0, 1],
    outputRange: [0.7, 1, 0.7],
  },
};

export const Pager = styled(RawPager).attrs({
  pageInterpolation: inlineCardsConfig,
  adjacentChildOffset: 1,
})<PagerCustomProps>`
  flex: 1;
  margin: 0 -${({theme}) => theme.space.pager}px;
  padding-top: ${({theme}) => theme.space.wide}px;
  padding-bottom: ${({theme, messageHeight}) =>
    messageHeight +
    theme.space.basic +
    theme.size.button.cat +
    theme.space.rootBottom}px;
`;
