import {ReactNode} from 'react';

export interface Props {
  message: string;
  onPress: () => void;
  disabled?: boolean;
  renderLeft?: ReactNode;
}
