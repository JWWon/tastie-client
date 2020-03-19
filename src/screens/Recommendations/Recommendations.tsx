import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import firebase from '@react-native-firebase/app';

import BaseView from '@components/templates/BaseView';
import RecommendationCard from '@components/atoms/RecommendationCard';
import Dismiss from '@components/atoms/Dismiss';
import TextHighlight from '@components/atoms/TextHighlight';
import {RootState} from '@store/reducers';
import {Recommendation} from '@services/recommendations';
import {updateMessage, hideMessage} from '@store/actions/navbar';
import {checkMaxSwipedIndex} from '@store/actions/recommendations';
import {RootNavigationProp} from '@navigations/Root';
import {CHARACTER_NAME, SCREEN, EVENT, MESSAGE} from '@utils/consts';
import size from '@styles/sizes';
import space from '@styles/spaces';
import * as s from './Recommendations.style';

type Status = 'LOADING' | 'SUCCESS' | 'ERROR';

interface Props {
  navigation: RootNavigationProp<typeof SCREEN.RECOMMENDATIONS>;
}

const bodyHeight = size.view.rootHeight - (size.button.dismiss + space.basic);

const Recommendations: React.FC<Props> = ({navigation}) => {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const {category} = useSelector((state: RootState) => state.case);
  const {loading, data, error} = useSelector(
    (state: RootState) => state.recommendations,
  );
  const {messageHeight} = useSelector((state: RootState) => state.device);
  const startPosition = (bodyHeight - messageHeight) * 0.44;
  // useState
  const [status, setStatus] = useState<Status>('LOADING');
  const [translateY] = useState<Animated.Value>(
    new Animated.Value(startPosition),
  );

  const handleDismiss = () => {
    firebase.analytics().logEvent(EVENT.PRESS_DISMISS_RECOMMENDATIONS);
    navigation.navigate(SCREEN.CASE);
  };

  const handleSnap = (index: number) => dispatch(checkMaxSwipedIndex(index));

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
          dispatch(updateMessage({message: MESSAGE.SHOW_RECOMMENDATIONS}));
          setStatus('SUCCESS');
        });
      }
    }
  }, [loading]);

  const renderCard = ({item}: {item: Recommendation; index: number}) => (
    <RecommendationCard navigation={navigation} {...item} />
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

export default Recommendations;
