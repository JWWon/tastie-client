import React from 'react';

import * as style from './Helper.style';
import {Props} from './Helper.type';

const Helper: React.FC<Props> = ({autocomplete, placeholder, onSelect}) => {
  if (placeholder) {
    return <style.Placeholder>{placeholder}</style.Placeholder>;
  }
  if (autocomplete && onSelect) {
    return (
      <style.AutoCompleteWrapper>
        {autocomplete.map((item, idx) => (
          <style.AutoCompleteItem key={idx} onPress={() => onSelect(item)}>
            <style.AutoCompleteText>{item}</style.AutoCompleteText>
          </style.AutoCompleteItem>
        ))}
      </style.AutoCompleteWrapper>
    );
  }
  return null;
};

export default Helper;
