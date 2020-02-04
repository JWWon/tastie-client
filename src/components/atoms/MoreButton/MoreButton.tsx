import React from 'react';

import Fading from '@components/atoms/Fading';
import * as style from './MoreButton.style';
import {Props} from './MoreButton.type';

const MoreButton: React.FC<Props> = ({message, onPress, ...option}) => (
  <Fading {...option}>
    <style.Button onPress={onPress}>
      <style.MoreIcon />
      <style.MoreMessage>{message}</style.MoreMessage>
    </style.Button>
  </Fading>
);

export default MoreButton;
