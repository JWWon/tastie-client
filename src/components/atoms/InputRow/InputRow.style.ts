import styled from 'styled-components/native';

// Wrapper
export const Wrapper = styled.View`
  flex-direction: row;
`;
// END Container, Wrapper

// Text Content
export const Content = styled.Text`
  ${({theme}) => theme.font.content}
`;
// END Text Content

// Text Input
interface InputWrapperProps {
  maxSize?: number;
}

export const InputWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})<InputWrapperProps>`
  ${({maxSize}) =>
    maxSize ? `width: ${maxSize * letterWidth + 8}px` : 'flex: 1'};
  border: 0px solid ${props => props.theme.color.blue};
  border-bottom-width: 1px;
  padding: 0 0 2px;
`;

const letterWidth = 23;
export const TextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  returnKeyType: 'search',
  underlineColorAndroid: 'transparent',
})`
  ${({theme}) => theme.font.size24}
  color: ${({theme}) => theme.color.black};
  width: 100%;
  margin: 0;
  text-align: center;
`;
// END Text Input
