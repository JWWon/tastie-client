import styled from 'styled-components/native';
import RawCarousel, {
  ParallaxImage,
  Pagination as RawPagination,
} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const Container = styled.View`
  height: ${height * 0.6}px;
`;

export const Carousel = styled(RawCarousel).attrs({
  containerCustomStyle: {flex: 1},
  sliderWidth: width,
  itemWidth: width,
  inactiveSlideScale: 1,
  initialNumToRender: 3,
  windowSize: 3,
})``;

export const Card = styled.View`
  flex: 1;
`;

export const Image = styled(ParallaxImage).attrs({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    // Prevent a random Android rendering issue
    marginBottom: Platform.select({ios: 0, android: 1}),
  },
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  resize-mode: cover;
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

export const PaginationWrapper = styled.View`
  position: absolute;
  bottom: -30px; /* TODO: Fix unknown space on pagination */
  left: 0;
  right: 0;
  align-items: center;
`;

const dotSize = 6;
export const Pagination = styled(RawPagination).attrs(({theme}) => ({
  dotContainerStyle: {
    marginBottom: theme.space.narrow,
  },
  dotStyle: {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2,
    marginHorizontal: 2,
    backgroundColor: theme.color.blue,
  },
  inactiveDotStyle: {
    backgroundColor: theme.color.grayLighter,
  },
  inactiveDotOpacity: 1,
  inactiveDotScale: 1,
  // animate options
  animatedDuration: 250,
  animatedFriction: 4,
  animatedTension: 50,
  delayPressInDot: 0,
}))``;
