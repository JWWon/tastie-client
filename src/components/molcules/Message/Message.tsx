import React from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '@store/reducers';
import Loading from '@components/atoms/Loading';
import {updateMessageHeight} from '@store/actions/device';
import * as s from './Message.style';

const Message: React.FC = () => {
  const dispatch = useDispatch();
  const {content, loading, hide, onPress} = useSelector(
    (state: RootState) => state.message,
  );

  if (hide) {
    return null;
  }

  function layoutDidMount(e: LayoutChangeEvent) {
    const {height: messageHeight} = e.nativeEvent.layout;
    dispatch(updateMessageHeight({messageHeight}));
  }

  const alert = onPress !== undefined && !loading;
  return (
    <s.Fading onLayout={layoutDidMount}>
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
