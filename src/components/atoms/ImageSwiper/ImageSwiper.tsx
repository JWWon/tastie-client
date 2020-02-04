import React from 'react';
import {
  PagerProvider,
  iPageInterpolation,
  Pagination,
  usePager,
} from '@crowdlinker/react-native-pager';

import * as s from './ImageSwiper.style';
import {Props} from './ImageSwiper.type';

const inlineCardsConfig: iPageInterpolation = {
  opacity: {
    inputRange: [-1, 0, 1],
    outputRange: [0.6, 1, 0.6],
  },
};

const circleConfig: iPageInterpolation = {
  transform: [
    {
      scale: {
        inputRange: [-2, -1, 0, 1, 2],
        outputRange: [0.7, 0.7, 1, 0.7, 0.7],
      },
    },
  ],
};

const dotWidth = 6;

const ImageSwiper: React.FC<Props> = ({images}) => {
  const [activeIdx] = usePager();

  return (
    <s.Container>
      <s.Pager pageInterpolation={inlineCardsConfig} adjacentChildOffset={3}>
        {images.map((uri, idx) => (
          <s.Card key={idx.toString()}>
            <s.Image source={{uri}} />
            <s.Filter />
          </s.Card>
        ))}
      </s.Pager>
      <Pagination
        style={{
          ...s.pagination,
          width: `${images.length * dotWidth}%`,
          left: `${50 - (images.length * dotWidth) / 2}%`,
        }}
        pageInterpolation={circleConfig}>
        {images.map((_, idx) => (
          <s.DotWrapper key={idx.toString()}>
            <s.Dot active={idx === activeIdx} />
          </s.DotWrapper>
        ))}
      </Pagination>
    </s.Container>
  );
};

export default (props: Props) => (
  <PagerProvider>
    <ImageSwiper {...props} />
  </PagerProvider>
);
