import {ImageProps} from 'react-native';

export interface Props extends ImageProps {
  onPress: () => void;
}
