import styled from 'styled-components/native';

// Wrapper
export const Wrapper = styled.View`
  flex-direction: row;
`;
// END Container, Wrapper

// Text Content
export const Content = styled.Text`
  font-family: NanumSquareR;
  font-size: 24px;
  color: ${props => props.theme.color.greyDark};
`;
// END Text Content

// Text Input
export const InputWrapper = styled.View`
  border: 0px solid ${props => props.theme.color.blue};
  border-bottom-width: 1px;
  padding: 0 0 2px;
`;

interface InputProps {
  size: number;
}
const letterWidth = 23;
export const TextInput = styled.TextInput<InputProps>`
  width: ${props => props.size * letterWidth + 8}px;
  text-align: center;
  font-family: NanumSquareB;
  font-size: 24px;
  color: ${props => props.theme.color.black};
`;
// END Text Input
