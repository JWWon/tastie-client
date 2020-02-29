import styled from 'styled-components/native';

import Helper from '@components/atoms/InputHelper';
import color from '@styles/colors';
import {Status} from './TextInput.type';

const borderColor = (status: Status) => {
  switch (status) {
    case 'FOCUS':
      return color.blue;
    case 'ERROR':
      return color.pink;
    default:
      return color.grayDark;
  }
};

interface InputProps {
  status: Status;
}

export const Wrapper = styled.View`
  width: 100%;
  padding-bottom: ${({theme}) => theme.space.wide}px;
`;

export const Input = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  returnKeyType: 'search',
  underlineColorAndroid: 'transparent',
})<InputProps>`
  ${({theme}) => theme.font.size24}
  color: ${({theme}) => theme.color.black};
  width: 100%;
  border: 0px solid ${({status}) => borderColor(status)};
  border-bottom-width: 1px;
  padding: 0 0 2px;
  margin: 0;
  text-align: center;
`;

export const InputHelper = styled(Helper)<InputProps>`
  color: ${({status}) => borderColor(status)};
`;
