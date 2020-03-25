import {ImageProps} from 'react-native';

export interface Props extends ImageProps {
  onPress: () => void;
  extraSpace?: boolean;
  height?: number;
  message?: string;
  messageColor?: string;
}
