import {Animated} from 'react-native';

import {Props as TextProps} from '@components/atoms/TextRow';
import {Props as HelperProps} from '@components/atoms/HelperRow';

export interface Props extends TextProps, HelperProps {}

export interface State {
  value: Animated.Value;
}
