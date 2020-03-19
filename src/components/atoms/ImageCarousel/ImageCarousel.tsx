import React, {useState} from 'react';
import {AdditionalParallaxProps} from 'react-native-snap-carousel';

import {Props} from './ImageCarousel.type';
import * as s from './ImageCarousel.style';

const ImageCard = (
  {item}: {item: string; index: number},
  props: AdditionalParallaxProps,
) => (
  <s.Card>
    <s.Image source={{uri: item}} {...props} />
    <s.Filter />
  </s.Card>
);

const ImageCarousel: React.FC<Props> = ({photoUrls}) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <s.Container>
      <s.Carousel
        data={photoUrls}
        renderItem={ImageCard}
        onSnapToItem={setIndex}
        hasParallaxImages
      />
      <s.PaginationWrapper>
        <s.Pagination dotsLength={photoUrls.length} activeDotIndex={index} />
      </s.PaginationWrapper>
    </s.Container>
  );
};

export default ImageCarousel;
