import styled from 'styled-components/native';
import {FlatList as RawFlatList} from 'react-native';

export const FlatList = styled(RawFlatList).attrs({
  horizontal: true,
  keyExtractor: (_, idx) => idx.toString(),
  contentContainerStyle: {alignItems: 'center'},
})``;

const width = 7;
export const Dot = styled.View`
  width: ${width}px;
  height: 10px;
  margin: 0 ${width / 2}px;

  border-radius: ${width / 2}px;
`;
