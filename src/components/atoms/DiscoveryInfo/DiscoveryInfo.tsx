import React from 'react';

import {Props} from './DiscoveryInfo.type';
import * as s from './DiscoveryInfo.style';

/**
 * @param data
 * Show 'data' if exists, or show custom view.
 */
const DiscoveryInfo: React.FC<Props> = ({icon, title, data}) => (
  <s.Wrapper>
    <s.Icon source={icon} />
    <s.Title>{title}</s.Title>
    <s.Data>{data}</s.Data>
  </s.Wrapper>
);

export default DiscoveryInfo;
