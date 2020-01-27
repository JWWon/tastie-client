import React from 'react';

import * as style from './TextRow.style';
import {Props} from './TextRow.type';

const MainText: React.FC<Props> = ({
  message,
  leadMessage,
  maxSize,
  ...props
}) => (
  <style.Wrapper>
    {leadMessage && <style.Content>{leadMessage}</style.Content>}
    {maxSize > 0 && (
      <style.InputWrapper>
        <style.TextInput
          size={maxSize}
          underlineColorAndroid="transparent"
          {...props}
        />
      </style.InputWrapper>
    )}
    <style.Content>{message}</style.Content>
  </style.Wrapper>
);

export default MainText;
