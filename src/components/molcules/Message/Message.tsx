import React from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '@store/reducers';
import Loading from '@components/atoms/Loading';
import Fading from '@components/atoms/Fading';
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
    const {height} = e.nativeEvent.layout;
    dispatch(updateMessageHeight({messageHeight: height}));
  }

  const alert = onPress !== undefined && !loading;

  return (
    <Fading>
      <s.Container onLayout={layoutDidMount}>
        <s.Bubble alert={alert}>
          {loading ? (
            <Loading />
          ) : (
            <s.Content alert={alert}>{content}</s.Content>
          )}
        </s.Bubble>
        <s.TriangleBorder>
          <s.TriangleBackground alert={alert} />
        </s.TriangleBorder>
      </s.Container>
    </Fading>
  );
};

export default Message;
