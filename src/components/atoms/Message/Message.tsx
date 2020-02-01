import React from 'react';
import {useSelector} from 'react-redux';

import * as s from './Message.style';
import {RootState} from '@store/reducers';

const Message: React.FC = () => {
  const {content, loading, hide, onPress} = useSelector(
    (state: RootState) => state.message,
  );

  if (hide) {
    return null;
  }

  const alert = onPress !== undefined && !loading;
  return (
    <s.Fading>
      <s.Bubble alert={alert}>
        <s.Content alert={alert}>{loading ? '로딩중...' : content}</s.Content>
      </s.Bubble>
      <s.TriangleBorder>
        <s.TriangleBackground alert={alert} />
      </s.TriangleBorder>
    </s.Fading>
  );
};

export default Message;
