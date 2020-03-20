import React, {useState, useRef, RefObject} from 'react';
import {TextInput} from 'react-native';
import firebase from '@react-native-firebase/app';

import Text from '@components/atoms/TextHighlight';
import Input from '@components/atoms/InputWithText';
import Helper, {SelectAutocomplete} from '@components/atoms/InputHelper';
import {SEARCH, EVENT} from '@utils/consts';
import {Props} from './Sentence.type';
import * as s from './Sentence.style';

const Sentence: React.FC<Props> = ({
  value: storeValue,
  autocomplete,
  placeholder,
  onChangeText,
  onPress,
  ...props
}) => {
  // useRef
  const inputRef = useRef() as RefObject<TextInput>;
  // useState
  const [inputValue, setInputValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  const editable = onChangeText !== undefined;

  // * Active when editable={true}
  function handleFocus() {
    if (onPress) onPress();

    setIsEditing(true);
    // sync values with remote
    setInputValue(storeValue || '');
  }

  function handleBlur() {
    if (onChangeText) {
      // send data to parent
      onChangeText(inputValue);
    }
  }
  // END Active when editable={true}

  // * Active when editable={false}
  function handlePress() {
    if (!!storeValue && onPress) onPress();
  }
  // END Active when editable={false}

  const handleSelect: SelectAutocomplete = value => {
    if (autocomplete) {
      if (value.name === SEARCH) {
        inputRef.current?.focus();
        firebase.analytics().logEvent(EVENT.PRESS_LOCATION_SEARCH);
      } else {
        autocomplete.onSelect(value);
        setIsEditing(false);
      }
    }
  };

  return (
    <s.Fading>
      {storeValue !== undefined ? (
        <Input
          editable={editable}
          onChangeText={setInputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPress={handlePress}
          value={isEditing ? inputValue : storeValue}
          ref={inputRef}
          {...props}
        />
      ) : (
        <Text {...props} />
      )}
      <Helper
        value={storeValue}
        placeholder={placeholder}
        autocomplete={
          autocomplete !== undefined
            ? {...autocomplete, onSelect: handleSelect}
            : undefined
        }
      />
    </s.Fading>
  );
};

export default Sentence;
