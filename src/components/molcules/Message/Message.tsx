import React from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '@store/reducers';
import Triangle from '@components/atoms/Triangle';
import Loading from '@components/atoms/Loading';
import Fading from '@components/atoms/Fading';
import {updateMessageHeight} from '@store/actions/device';
import * as s from './Message.style';

const triangleHeight = 16;

const Message: React.FC = () => {
  const dispatch = useDispatch();
  const {message, loading, showMessage, customAction} = useSelector(
    (state: RootState) => state.navbar,
  );

  function layoutDidMount(e: LayoutChangeEvent) {
    const {height: messageHeight} = e.nativeEvent.layout;
    dispatch(updateMessageHeight({messageHeight}));
  }

  const isAlert = !!customAction && !loading;

  return showMessage ? (
    <Fading>
      <s.Container onLayout={layoutDidMount}>
        <s.Bubble>
          <s.Square alertMode={isAlert}>
            {loading ? (
              <Loading />
            ) : (
              <s.Content alertMode={isAlert}>{message}</s.Content>
            )}
          </s.Square>
          <Triangle
            point="down"
            active={isAlert}
            width={12}
            height={triangleHeight}
          />
        </s.Bubble>
        <s.BottomSpace height={triangleHeight} />
      </s.Container>
    </Fading>
  ) : null;
};

export default Message;
