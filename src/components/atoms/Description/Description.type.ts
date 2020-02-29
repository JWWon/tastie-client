import {ViewStyle} from 'react-native';

export interface Props {
  message: string;
  onPress?: () => void;
  style?: ViewStyle;
}
