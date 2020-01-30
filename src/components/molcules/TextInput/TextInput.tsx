import React from 'react';

import {Props} from './TextInput.type';
import * as style from './TextInput.style';
import TextRow from '@components/atoms/TextRow';
import Helper from '@components/atoms/HelperRow';

const TextInput: React.FC<Props> = ({
  autocomplete,
  placeholder,
  onSelect,
  value,
  ...props
}) => (
  <style.Fading>
    <TextRow {...{value, ...props}} />
    <Helper {...{autocomplete, placeholder, onSelect, value}} />
  </style.Fading>
);

export default TextInput;
