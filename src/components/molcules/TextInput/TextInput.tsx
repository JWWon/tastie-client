import React from 'react';

import * as style from './TextInput.style';
import {Props} from './TextInput.type';
import TextRow from '@components/atoms/TextRow';
import Helper from '@components/atoms/HelperRow';

const TextInput: React.FC<Props> = ({
  autocomplete,
  placeholder,
  onPress: onClick,
  ...texts
}) => (
  <style.Container>
    <TextRow {...texts} />
    <Helper {...{autocomplete, placeholder, onPress: onClick}} />
  </style.Container>
);

export default TextInput;
