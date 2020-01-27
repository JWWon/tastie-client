import React from 'react';

import * as style from './TextInput.style';
import {Props} from './TextInput.type';
import TextRow from '@components/atoms/TextRow';
import Helper from '@components/atoms/HelperRow';

// TODO: Implement animation effect when show & hide
const TextInput: React.FC<Props> = ({
  autocomplete,
  placeholder,
  onSelect,
  value,
  ...props
}) => {
  return (
    <style.Container>
      <TextRow {...{value, ...props}} />
      <Helper {...{autocomplete, placeholder, onSelect, value}} />
    </style.Container>
  );
};

export default TextInput;
