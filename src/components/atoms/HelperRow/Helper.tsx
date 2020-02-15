import React from 'react';
import {FlatList} from 'react-native';

import * as s from './Helper.style';
import {Props, AutoCompleteInterface} from './Helper.type';

const Helper: React.FC<Props> = ({autocomplete, placeholder, value}) => {
  if (placeholder) {
    return <s.Placeholder>{placeholder}</s.Placeholder>;
  }

  if (value) {
    return null;
  }

  if (autocomplete !== undefined) {
    const {data, onSelect} = autocomplete;
    return (
      <s.AutoCompleteWrapper>
        <FlatList<AutoCompleteInterface>
          data={data}
          renderItem={({item}) => (
            <s.AutoCompleteItem onPress={() => onSelect(item)}>
              <s.AutoCompleteText isDefault={item.isDefault === true}>
                {item.name}
              </s.AutoCompleteText>
            </s.AutoCompleteItem>
          )}
          keyExtractor={(_, idx) => idx.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </s.AutoCompleteWrapper>
    );
  }

  return null;
};

export default Helper;
