import React from 'react';

import * as style from './TextInput.style';
import {Props} from './TextInput.type';
import TextRow from '@components/atoms/TextRow';
import Helper from '@components/atoms/HelperRow';

const TextInput: React.FC<Props> = ({
  autocomplete,
  placeholder,
  onSelect,
  ...texts
}) => (
  <style.Container>
    <TextRow {...texts} />
    <Helper {...{autocomplete, placeholder, onSelect}} />
  </style.Container>
);

export default TextInput;
