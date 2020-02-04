import React from 'react';

import * as s from './InputRow.style';
import {Props} from './InputRow.type';

const MainText: React.FC<Props> = ({
  message,
  leadMessage,
  maxSize,
  ...props
}) => (
  <s.Wrapper>
    {leadMessage && <s.Content>{leadMessage}</s.Content>}
    <s.InputWrapper>
      <s.TextInput
        size={maxSize}
        underlineColorAndroid="transparent"
        {...props}
      />
    </s.InputWrapper>
    <s.Content>{message}</s.Content>
  </s.Wrapper>
);

export default MainText;
