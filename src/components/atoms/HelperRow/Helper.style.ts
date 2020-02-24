import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Placeholder = styled.Text`
  ${({theme}) => theme.font.size14}
  margin-top: 4px;
  color: ${({theme}) => theme.color.grayLight};
`;

export const AutoCompleteWrapper = styled.View`
  width: ${Dimensions.get('screen').width}px;
  height: 32px;
  margin: 8px -${({theme}) => theme.space.rootHorizontal}px 0;
  padding: 0 ${({theme}) => theme.space.rootHorizontal}px;
`;

export const AutoCompleteItem = styled.TouchableOpacity`
  height: 100%;
  padding: 0 8px;
  align-items: center;
  justify-content: center;
`;

interface TextProps {
  isDefault: boolean;
}

export const AutoCompleteText = styled.Text<TextProps>`
  font-family: NanumSquareEB;
  font-size: 16px;
  color: ${({theme, isDefault}) =>
    isDefault ? theme.color.black : theme.color.grayDark};
`;
