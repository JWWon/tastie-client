import {ViewStyle, TextProps} from 'react-native';

export interface Props extends TextProps {
  message: string;
  style?: ViewStyle;
}
