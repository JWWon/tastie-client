import React from 'react';

import * as s from './InputWithText.style';
import {Props} from './InputWithText.type';

const InputWithText: React.FC<Props> = ({
  // required
  message,
  editable,
  // options
  leadMessage,
  maxSize,
  onPress,
  ...props
}) => (
  <s.Wrapper>
    {leadMessage && <s.Content>{leadMessage}</s.Content>}
    <s.InputWrapper maxSize={maxSize} disabled={editable} onPress={onPress}>
      <s.TextInput
        editable={editable}
        pointerEvents={editable ? 'auto' : 'none'}
        {...props}
      />
    </s.InputWrapper>
    <s.Content>{message}</s.Content>
  </s.Wrapper>
);

export default InputWithText;
