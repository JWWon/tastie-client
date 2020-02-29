import React from 'react';

import {Props} from './DismissButton.type';
import * as s from './DismissButton.style';

const DismissButton: React.FC<Props> = ({icon, onPress}) => (
  <s.Wrapper onPress={onPress}>
    <s.Icon
      source={
        icon === 'arrow'
          ? require('@assets/images/icon-arrow/icon-arrow.png')
          : require('@assets/images/icon-close/icon-close.png')
      }
    />
  </s.Wrapper>
);

export default DismissButton;
