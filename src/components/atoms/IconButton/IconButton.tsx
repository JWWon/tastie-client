import React from 'react';

import * as s from './IconButton.style';
import {Props} from './IconButton.type';

const IconButton: React.FC<Props> = ({onPress, style, ...image}) => (
  <s.Button style={style} onPress={onPress}>
    <s.Icon resizeMode="contain" {...image} />
  </s.Button>
);

export default IconButton;
