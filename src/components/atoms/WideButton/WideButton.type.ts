import {ImageSourcePropType, ViewStyle} from 'react-native';

export interface Props {
  message: string;
  onPress: () => void;
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  height?: number;
  buttonColor?: 'blue' | 'blueMild';
}
