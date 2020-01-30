import React from 'react';

import {Props} from './Sentence.type';
import * as style from './Sentence.style';
import TextRow from '@components/atoms/TextRow';
import Helper from '@components/atoms/HelperRow';

const Sentence: React.FC<Props> = ({
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

export default Sentence;
