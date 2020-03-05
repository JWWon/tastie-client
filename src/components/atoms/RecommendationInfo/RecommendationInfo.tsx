import React from 'react';

import {Props} from './RecommendationInfo.type';
import * as s from './RecommendationInfo.style';

const RecommendationInfo: React.FC<Props> = ({icon, title, data}) => (
  <s.Wrapper>
    <s.Icon source={icon} />
    <s.Title>{title}</s.Title>
    <s.Data>{data}</s.Data>
  </s.Wrapper>
);

export default RecommendationInfo;
