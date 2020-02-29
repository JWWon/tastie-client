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
        <Triangle
          point="down"
          active={alert}
          width={12}
          height={triangleHeight}
        />
      </s.Container>
      <s.Space height={triangleHeight} />
    </Fading>
  );
};

export default Message;
