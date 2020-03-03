import React from 'react';
import {Platform} from 'react-native';

import Dismiss from '@components/atoms/Dismiss';
import * as s from './Modal.style';

interface Props {
  onDismiss: () => void;
}

const Modal: React.FC<Props> = ({onDismiss, children}) => (
  <s.ModalTouch onPress={onDismiss}>
    {Platform.OS === 'ios' && <s.ModalBlur />}
    <s.ModalSafeView>
      <Dismiss icon="close" onPress={onDismiss} />
    </s.ModalSafeView>
    {children}
  </s.ModalTouch>
);

export default Modal;
