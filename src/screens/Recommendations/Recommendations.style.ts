import styled from 'styled-components/native';
import RawCarousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';

interface PagerCustomProps {
  messageHeight: number;
}

const {width} = Dimensions.get('screen');

export const Carousel = styled(RawCarousel).attrs<PagerCustomProps>(
  ({theme, messageHeight}) => ({
    containerCustomStyle: {
      flex: 1,
      marginHorizontal: -theme.space.rootHorizontal,
      paddingTop: theme.space.wide,
      paddingBottom:
        messageHeight +
        theme.space.basic +
        theme.size.button.cat +
        theme.space.rootBottom,
    },
    sliderWidth: width,
    itemWidth: width - 2 * (theme.space.rootHorizontal - theme.space.pager),
    inactiveSlideScale: 1,
    initialNumToRender: 3,
    windowSize: 3,
  }),
)<PagerCustomProps>``;
