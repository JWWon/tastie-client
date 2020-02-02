import React from 'react';

import Sentence from '@components/molcules/Sentence';
import * as s from './Recommend.style';

const Recommend: React.FC = () => (
  <s.Home>
    <Sentence maxSize={0} message="Anna가 정하는 중이에요." />
  </s.Home>
);

export default Recommend;
