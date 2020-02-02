import React from 'react';

import {Props} from './Sentence.type';
import * as style from './Sentence.style';
import Text from '@components/atoms/TextRow';
import Input from '@components/atoms/InputRow';
import Helper from '@components/atoms/HelperRow';

const Sentence: React.FC<Props> = ({
  autocomplete,
  placeholder,
  onSelect,
  value,
  ...props
}) => (
  <style.Fading>
    {value !== undefined ? (
      <Input {...{value, ...props}} />
    ) : (
      <Text {...props} />
    )}
    <Helper {...{autocomplete, placeholder, onSelect, value}} />
  </style.Fading>
);

export default Sentence;
