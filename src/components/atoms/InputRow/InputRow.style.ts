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
interface InputProps {
  maxSize?: number;
}

export const InputWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})<InputProps>`
  ${({maxSize}) =>
    maxSize ? `width: ${maxSize * letterWidth + 8}px` : 'flex: 1'};
  border: 0px solid ${props => props.theme.color.blue};
  border-bottom-width: 1px;
  padding: 0 0 2px;
`;

const letterWidth = 23;
export const TextInput = styled.TextInput.attrs({
  pointerEvents: 'none',
})`
  width: 100%;
  padding: 0; /* Corresponding Android */
  text-align: center;
  ${mixin.keyword}
`;
// END Text Input
