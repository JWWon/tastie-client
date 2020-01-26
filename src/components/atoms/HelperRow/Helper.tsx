import React from 'react';

import * as style from './Helper.style';
import {Props} from './Helper.type';

const Helper: React.FC<Props> = ({autocomplete, placeholder, onPress}) => {
  if (placeholder) {
    return <style.Placeholder>{placeholder}</style.Placeholder>;
  }
  if (autocomplete && onPress) {
    return (
      <style.AutoCompleteWrapper>
        {autocomplete.map((item, idx) => (
          <style.AutoCompleteItem key={idx} onPress={() => onPress(item)}>
            <style.AutoCompleteText>{item}</style.AutoCompleteText>
          </style.AutoCompleteItem>
        ))}
      </style.AutoCompleteWrapper>
    );
  }
  return null;
};

export default Helper;
