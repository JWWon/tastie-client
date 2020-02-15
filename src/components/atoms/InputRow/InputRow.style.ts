import styled from 'styled-components/native';

import * as mixin from '@styles/mixins';

// Wrapper
export const Wrapper = styled.View`
  flex-direction: row;
`;
// END Container, Wrapper

// Text Content
export const Content = styled.Text`
  ${mixin.content}
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
  width: 100%;
  margin: 0;
  text-align: center;
  ${mixin.keyword}
`;
// END Text Input
