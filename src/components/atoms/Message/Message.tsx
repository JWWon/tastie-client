import React from 'react';

import Fading from '@components/atoms/Fading';
import * as s from './Message.style';
import {Props} from './Message.type';

const Message: React.FC<Props> = ({message, loading, disable, onPress}) => {
  if (message === '' || loading === true) {
    return null;
  }

  const pressActive = onPress !== undefined && !disable;
  return (
    <Fading alignItems="center" marginBottom={6}>
      <s.Wrapper pressActive={pressActive}>
        <s.Content pressActive={pressActive}>{message}</s.Content>
      </s.Wrapper>
      <s.TriangleBorder>
        <s.TriangleBackground pressActive={pressActive} />
      </s.TriangleBorder>
    </Fading>
  );
};

export default Message;
