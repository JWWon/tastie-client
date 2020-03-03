import React from 'react';

import {Props} from './Dismiss.type';
import * as s from './Dismiss.style';

const Dismiss: React.FC<Props> = ({icon, onPress, absolute, style}) => {
  const DismissButton = (
    <s.Button onPress={onPress} style={style}>
      <s.Icon
        source={
          icon === 'arrow'
            ? require('@assets/images/icon-arrow/icon-arrow.png')
            : require('@assets/images/icon-close/icon-close.png')
        }
      />
    </s.Button>
  );

  return absolute ? (
    <s.WrapperAbsolute icon={icon}>{DismissButton}</s.WrapperAbsolute>
  ) : (
    <s.WrapperRelative icon={icon}>{DismissButton}</s.WrapperRelative>
  );
};

export default Dismiss;
