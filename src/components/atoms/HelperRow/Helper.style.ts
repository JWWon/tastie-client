import styled from 'styled-components/native';

export const Placeholder = styled.Text`
  margin-top: 4px;
  font-family: NanumSquareR;
  font-size: 14px;
  color: ${props => props.theme.color.greyLight};
`;

export const AutoCompleteWrapper = styled.View`
  flex-direction: row;
  width: 100%;
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

export const AutoCompleteText = styled.Text`
  font-family: NanumSquareB;
  font-size: 14px;
  color: ${props => props.theme.color.greyDark};
`;
