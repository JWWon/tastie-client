import {ImageProps, ViewStyle} from 'react-native';

export interface Props extends ImageProps {
  onPress?: () => void;
  extraSpace?: boolean;
  height?: number;
  message?: string;
  messageStyle?: ViewStyle;
}
