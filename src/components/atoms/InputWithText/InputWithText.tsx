import React from 'react';
import {TextInput} from 'react-native';

import * as s from './InputWithText.style';
import {Props} from './InputWithText.type';

const InputWithText = React.forwardRef<TextInput, Props>(
  ({message, editable, leadMessage, maxSize, onPress, ...props}, ref) => (
    <s.Wrapper>
      {leadMessage && <s.Content>{leadMessage}</s.Content>}
      <s.InputWrapper maxSize={maxSize} disabled={editable} onPress={onPress}>
        <s.TextInput
          ref={ref}
          editable={editable}
          pointerEvents={editable ? 'auto' : 'none'}
          {...props}
        />
      </s.InputWrapper>
      <s.Content>{message}</s.Content>
    </s.Wrapper>
  ),
);

export default InputWithText;
