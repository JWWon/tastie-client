import React from 'react';

import {Props} from './RecommendationInfo.type';
import * as s from './RecommendationInfo.style';

/**
 *
 * @param data
 * Show 'data' if exists, or show custom view.
 */
const RecommendationInfo: React.FC<Props> = ({icon, title, data, children}) => (
  <s.Wrapper>
    <s.Icon source={icon} />
    <s.Title>{title}</s.Title>
    {data ? <s.Data>{data}</s.Data> : children}
  </s.Wrapper>
);

export default RecommendationInfo;
