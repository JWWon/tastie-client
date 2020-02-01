import React from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '@store/reducers';
import Loading from '@components/atoms/Loading';
import * as s from './Message.style';

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
        {loading ? <Loading /> : <s.Content alert={alert}>{content}</s.Content>}
      </s.Bubble>
      <s.TriangleBorder>
        <s.TriangleBackground alert={alert} />
      </s.TriangleBorder>
    </s.Fading>
  );
};

export default Message;
