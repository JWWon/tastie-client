import React from 'react';
import {
  PagerProvider,
  Pagination,
  usePager,
} from '@crowdlinker/react-native-pager';
import {Dimensions} from 'react-native';

import * as s from './ImageSwiper.style';
import {Props} from './ImageSwiper.type';

const {width: screenWidth} = Dimensions.get('screen');

const ImageSwiper: React.FC<Props> = ({images}) => {
  const [activeIdx] = usePager();

  const paginationWidth = images.length * (s.dotSize + 12);

  return (
    <s.Container>
      <s.Pager>
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
          width: paginationWidth,
          left: (screenWidth - paginationWidth) / 2,
        }}
        pageInterpolation={{}}>
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
