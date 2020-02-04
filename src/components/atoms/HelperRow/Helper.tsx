import React from 'react';
import {FlatList} from 'react-native';

import * as style from './Helper.style';
import {Props, AutoCompleteInterface} from './Helper.type';

const Helper: React.FC<Props> = ({
  autocomplete,
  placeholder,
  onSelect,
  value,
}) => {
  if (placeholder) {
    return <style.Placeholder>{placeholder}</style.Placeholder>;
  }
  if (value) {
    return null;
  }
  if (autocomplete && onSelect) {
    return (
      <style.AutoCompleteWrapper>
        <FlatList<AutoCompleteInterface>
          data={autocomplete}
          renderItem={({item}) => (
            <style.AutoCompleteItem onPress={() => onSelect(item.name)}>
              <style.AutoCompleteText>{item.name}</style.AutoCompleteText>
            </style.AutoCompleteItem>
          )}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </style.AutoCompleteWrapper>
    );
  }
  return null;
};

export default Helper;
