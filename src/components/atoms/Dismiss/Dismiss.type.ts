import {ViewStyle} from 'react-native';

export interface Props {
  icon: 'arrow' | 'close';
  onPress: () => void;
  absolute?: boolean;
  style?: ViewStyle;
}
