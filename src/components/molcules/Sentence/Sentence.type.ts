import {Props as InputProps} from '@components/atoms/InputRow';
import {Props as HelperProps} from '@components/atoms/HelperRow';

export interface Props extends InputProps, HelperProps {
  onChangeText?: (value: string) => void;
}
