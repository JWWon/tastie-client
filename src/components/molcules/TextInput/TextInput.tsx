import React, {useState, useEffect} from 'react';

import {Props, Status} from './TextInput.type';
import * as s from './TextInput.style';

const TextInput: React.FC<Props> = ({
  name,
  value,
  placeholder,
  error,
  hadSubmit,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}) => {
  const [status, setStatus] = useState<Status>('NONE');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [hadFocus, setHadFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(placeholder);

  function handleFocus() {
    if (onFocus) onFocus(name);
    setIsFocus(true);
  }

  function handleBlur() {
    if (onBlur) onBlur(name);
    if (!hadFocus) setHadFocus(true);
    setIsFocus(false);
  }

  function handleChange(text: string) {
    onChangeText(name)(text);
    if (status === 'ERROR' && !error) {
      setStatus('FOCUS');
    }
  }

  useEffect(() => {
    if ((hadFocus || hadSubmit) && error) {
      setStatus('ERROR');
      setMessage(error);
    } else if (isFocus) {
      setStatus('FOCUS');
      setMessage(placeholder);
    } else {
      setStatus('NONE');
      setMessage(value ? '' : placeholder);
    }
  }, [error, isFocus]);

  return (
    <s.Wrapper>
      <s.Input
        status={status}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChange}
        {...props}
      />
      <s.InputHelper status={status} placeholder={message} />
    </s.Wrapper>
  );
};

export default TextInput;
