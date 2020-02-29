import React from 'react';

import {Props} from './Triangle.type';
import * as s from './Triangle.style';

/* Component for 'Message' bubble */
const Triangle: React.FC<Props> = props => (
  <s.Position {...props}>
    <s.Background {...props}>
      <s.Overlay {...props}>
        <s.Inside {...props} />
      </s.Overlay>
    </s.Background>
  </s.Position>
);

export default Triangle;
