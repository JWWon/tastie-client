import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PagerProvider} from '@crowdlinker/react-native-pager';

import BaseView from '@components/templates/BaseView';
import RecommendationCard from '@components/organisms/RecommendationCard';
import Dismiss from '@components/atoms/Dismiss';
import TextHighlight from '@components/atoms/TextHighlight';
import {RootState} from '@store/reducers';
import {updateMessage, hideMessage} from '@store/actions/navbar';
import {clearRecommendations} from '@store/actions/recommendations';
import {RootNavigationProp} from '@navigations/Root';
import {CHARACTER_NAME, SCREEN} from '@utils/consts';
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
  const startPosition = (bodyHeight - messageHeight) * 0.4;
  // useState
  const [status, setStatus] = useState<Status>('LOADING');
  const [translateY] = useState<Animated.Value>(
    new Animated.Value(startPosition),
  );

  const handleDismiss = () => dispatch(clearRecommendations());

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
        return;
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
          dispatch(updateMessage({message: '맘에 들었다면 츄르를 달라옹!'}));
          setStatus('SUCCESS');
        });
        return;
      }
    }
  }, [loading]);

  return (
    <BaseView noWrapper>
      <Dismiss icon="close" onPress={handleDismiss} />
      <Animated.View style={{transform: [{translateY}]}}>
        <TextHighlight message={getTitle()} />
      </Animated.View>
      {status === 'SUCCESS' && (
        <PagerProvider>
          <s.Pager messageHeight={messageHeight}>
            {data.map((item, idx) => (
              <RecommendationCard
                key={idx.toString()}
                navigation={navigation}
                {...item}
              />
            ))}
          </s.Pager>
        </PagerProvider>
      )}
    </BaseView>
  );
};

export default Recommendations;
