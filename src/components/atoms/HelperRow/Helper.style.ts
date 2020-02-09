import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Placeholder = styled.Text`
  margin-top: 4px;
  font-family: NanumSquareR;
  font-size: 14px;
  color: ${props => props.theme.color.grayLight};
`;

export const AutoCompleteWrapper = styled.View`
  width: ${Dimensions.get('screen').width}px;
  height: 24px;
  margin: 8px -${props => props.theme.size.templatePadding}px 0;
  padding: 0 ${props => props.theme.size.templatePadding}px;
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
