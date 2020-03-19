import React from 'react';
import {FlatList} from 'react-native';

import * as s from './InputHelper.style';
import {Props, AutoCompleteInterface} from './InputHelper.type';

const InputHelper: React.FC<Props> = ({
  autocomplete,
  placeholder,
  value,
  style,
}) => {
  if (placeholder)
    return <s.Placeholder style={style}>{placeholder}</s.Placeholder>;

  if (value) return null;

  if (autocomplete !== undefined) {
    const {data, onSelect} = autocomplete;
    return (
      <s.AutoCompleteWrapper>
        <FlatList<AutoCompleteInterface>
          data={data}
          renderItem={({item}) => (
            <s.AutoCompleteItem onPress={() => onSelect(item)}>
              <s.AutoCompleteText
                isDefault={item.isDefault === true}
                style={style}>
                {item.name}
              </s.AutoCompleteText>
            </s.AutoCompleteItem>
          )}
          keyExtractor={(_, idx) => idx.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        />
      </s.AutoCompleteWrapper>
    );
  }

  return null;
};

export default InputHelper;
