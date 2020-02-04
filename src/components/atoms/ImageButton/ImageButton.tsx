import React from 'react';

import * as s from './ImageButton.style';
import {Props} from './ImageButton.type';

const ImageButton: React.FC<Props> = ({onPress, style, ...image}) => (
  <s.Button onPress={onPress} style={style}>
    <s.Icon source={image.source} {...image} />
  </s.Button>
);

export default ImageButton;
