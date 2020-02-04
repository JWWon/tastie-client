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
export const InputWrapper = styled.View`
  border: 0px solid ${props => props.theme.color.blue};
  border-bottom-width: 1px;
  padding: 0 0 2px;
`;

interface InputProps {
  size?: number;
}
const letterWidth = 23;
export const TextInput = styled.TextInput<InputProps>`
  width: ${props => (props.size || 1) * letterWidth + 8}px;
  padding: 0; /* Corresponding Android */
  text-align: center;
  ${mixin.keyword}
`;
// END Text Input
