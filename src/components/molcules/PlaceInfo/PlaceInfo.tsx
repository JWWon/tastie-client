import React from 'react';

import * as s from './PlaceInfo.style';

const PlaceInfo: React.FC = () => (
  <s.Container>
    <s.Header>
      <s.Title>Shake Shack Burger</s.Title>
      <s.DynamicInfo>
        <s.Category>햄버거, 긴 대기줄</s.Category>
        <s.Distance>300m</s.Distance>
      </s.DynamicInfo>
    </s.Header>
  </s.Container>
);

export default PlaceInfo;
