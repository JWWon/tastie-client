import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {FormikHandlers} from 'formik';

export type Status = 'NONE' | 'FOCUS' | 'ERROR';

export interface ChangeTextParams {
  index: string;
  value: string;
}

type PartialTextInputProps = Pick<
  TextInputProps,
  | 'secureTextEntry'
  | 'autoFocus'
  | 'onSubmitEditing'
  | 'keyboardType'
  | 'returnKeyType'
>;

export interface Props extends PartialTextInputProps {
  name: string;
  value: string;
  placeholder: string;
  onChangeText: FormikHandlers['handleChange'];
  error?: string;
  hadSubmit?: boolean;
  // TextInput Props
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData> | string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData> | string) => void;
  style?: ViewStyle;
}
