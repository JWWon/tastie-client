import {TextInput} from 'react-native';

import {Props as InputProps} from '@components/atoms/InputWithText';
import {Props as HelperProps} from '@components/atoms/InputHelper';

export interface Props extends InputProps, HelperProps {
  onChangeText?: (value: string) => void;
  inputRef?: React.RefObject<TextInput> & any;
}
