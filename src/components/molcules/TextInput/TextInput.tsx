import React, {useState, useEffect, forwardRef} from 'react';
import _ from 'lodash';

import {Props, Status} from './TextInput.type';
import * as s from './TextInput.style';
import {TextInput as InputType, Platform} from 'react-native';

export default forwardRef<InputType, Props>((props, ref) => {
  const [status, setStatus] = useState<Status>('NONE');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [hadFocus, setHadFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(props.placeholder);
  const options = _.pick(props, [
    'secureTextEntry',
    'autoFocus',
    'onSubmitEditing',
    'keyboardType',
    'returnKeyType',
  ]);

  function handleFocus() {
    if (props.onFocus) props.onFocus(props.name);
    setIsFocus(true);
  }

  function handleBlur() {
    if (props.onBlur) props.onBlur(props.name);
    if (!hadFocus) setHadFocus(true);
    setIsFocus(false);
  }

  function handleChange(text: string) {
    props.onChangeText(props.name)(text);
    if (status === 'ERROR' && !props.error) {
      setStatus('FOCUS');
    }
  }

  useEffect(() => {
    if ((hadFocus || props.hadSubmit) && props.error) {
      setStatus('ERROR');
      setMessage(props.error);
    } else if (isFocus) {
      setStatus('FOCUS');
      setMessage(props.placeholder);
    } else {
      setStatus('NONE');
      setMessage(props.value ? '' : props.placeholder);
    }
  }, [props.error, isFocus]);

  return (
    <s.Wrapper>
      <s.Input
        ref={ref}
        status={status}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChange}
        returnKeyType={'next'}
        {...options}
        secureTextEntry={Platform.OS === 'ios' && options.secureTextEntry} // TODO: Fix secureTextEntry is not appearing on android
      />
      <s.InputHelper status={status} placeholder={message} />
    </s.Wrapper>
  );
});
