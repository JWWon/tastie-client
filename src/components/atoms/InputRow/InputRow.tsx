import React, {useRef} from 'react';
import {TextInput} from 'react-native';

import * as s from './InputRow.style';
import {Props} from './InputRow.type';

const MainText: React.FC<Props> = ({
  // required
  message,
  editable,
  // options
  leadMessage,
  maxSize,
  onPress,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);

  function handlePress() {
    if (onPress) {
      onPress();
    }
    if (editable) {
      inputRef.current?.focus();
    }
  }

  return (
    <s.Wrapper>
      {leadMessage && <s.Content>{leadMessage}</s.Content>}
      <s.InputWrapper maxSize={maxSize} onPress={handlePress}>
        <s.TextInput
          {...props}
          editable={editable}
          ref={inputRef}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />
      </s.InputWrapper>
      <s.Content>{message}</s.Content>
    </s.Wrapper>
  );
};

export default MainText;
