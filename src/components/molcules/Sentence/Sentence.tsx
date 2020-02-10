import React, {useEffect, useState} from 'react';

import {Props} from './Sentence.type';
import * as s from './Sentence.style';
import Text from '@components/atoms/TextRow';
import Input from '@components/atoms/InputRow';
import Helper from '@components/atoms/HelperRow';

const Sentence: React.FC<Props> = ({
  autocomplete,
  placeholder,
  onSelect,
  value,
  onChangeText,
  ...props
}) => {
  const [cacheValue, setCacheValue] = useState<string | undefined>();
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  function handleFocus() {
    if (value) {
      setInputValue(value);
    }
    setIsEditing(true);
  }

  function handleBlur() {
    if (onChangeText !== undefined) {
      // send data to parent
      onChangeText(inputValue);
    }
  }

  function handleChangeText(name: string) {
    setInputValue(name);
  }

  useEffect(() => {
    if (value !== cacheValue) {
      // store is updated
      setIsEditing(false);
      setCacheValue(value);
    }
  }, [value, cacheValue]);

  return (
    <s.Fading>
      {value !== undefined ? (
        <Input
          editable={onChangeText !== undefined}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...{...props, value: isEditing ? inputValue : value}}
        />
      ) : (
        <Text {...props} />
      )}
      <Helper {...{autocomplete, placeholder, onSelect, value}} />
    </s.Fading>
  );
};

export default Sentence;
