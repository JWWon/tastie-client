import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import firebase from '@react-native-firebase/app';

import BaseView from '@components/templates/BaseView';
import DiscoveryCard from '@components/atoms/DiscoveryCard';
import Dismiss from '@components/atoms/Dismiss';
import TextHighlight from '@components/atoms/TextHighlight';
import {RootState} from '@store/reducers';
import {Discovery} from '@services/discoveries';
import {updateMessage, hideMessage} from '@store/actions/navbar';
import {updateMaxSwipedIndex} from '@store/actions/discoveries';
import {RootNavigationProp} from '@navigations/Root';
import {CHARACTER_NAME, SCREEN, EVENT, MESSAGE} from '@utils/consts';
import size from '@styles/sizes';
import space from '@styles/spaces';
import * as s from './Discoveries.style';

type Status = 'LOADING' | 'SUCCESS' | 'ERROR';

interface Props {
  navigation: RootNavigationProp<typeof SCREEN.DISCOVERIES>;
}

const bodyHeight = size.view.rootHeight - (size.button.dismiss + space.basic);

const Discoveries: React.FC<Props> = ({navigation}) => {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const {category} = useSelector((state: RootState) => state.case);
  const {loading, data, error} = useSelector(
    (state: RootState) => state.discoveries,
  );
  const {messageHeight} = useSelector((state: RootState) => state.device);
  const startPosition = (bodyHeight - messageHeight) * 0.44;
  // useState
  const [status, setStatus] = useState<Status>('LOADING');
  const [translateY] = useState<Animated.Value>(
    new Animated.Value(startPosition),
  );

  const handleDismiss = () => {
    firebase.analytics().logEvent(EVENT.PRESS_DISMISS_DISCOVERIES);
    navigation.navigate(SCREEN.CASE);
  };

  const handleSnap = (index: number) => dispatch(updateMaxSwipedIndex(index));

  function getTitle() {
    switch (status) {
      case 'LOADING':
        return `<b>${CHARACTER_NAME}</b>가 정하는 중이에요...`;
      case 'SUCCESS':
        return `오늘 <b>${category}</b>은(는) 이거애옹!`;
      default:
        return `<b>${CHARACTER_NAME}</b>가 정하지 못했어요 :(`;
    }
  }

  useEffect(() => {
    if (loading) {
      if (status !== 'LOADING') {
        // * Loading start
        translateY.setValue(startPosition);
        setStatus('LOADING');
      }
    } else {
      if (status === 'LOADING') {
        // * Loading finished
        if (error) {
          // Failure
          setStatus('ERROR');
          return;
        }
        // Success
        dispatch(hideMessage());
        // move text to top
        Animated.timing(translateY, {
          toValue: 0,
          duration: 560,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          dispatch(updateMessage({message: MESSAGE.SHOW_DISCOVERIES}));
          setStatus('SUCCESS');
        });
      }
    }
  }, [loading]);

  const renderCard = ({item}: {item: Discovery; index: number}) => (
    <DiscoveryCard navigation={navigation} {...item} />
  );

  return (
    <BaseView noWrapper>
      <Dismiss icon="close" onPress={handleDismiss} />
      <Animated.View style={{transform: [{translateY}]}}>
        <TextHighlight message={getTitle()} />
      </Animated.View>
      {status === 'SUCCESS' && (
        <s.Carousel
          data={data}
          renderItem={renderCard}
          messageHeight={messageHeight}
          onSnapToItem={handleSnap}
        />
      )}
    </BaseView>
  );
};

export default Discoveries;
