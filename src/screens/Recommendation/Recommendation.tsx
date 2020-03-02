import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import KeyboardSafeView from '@components/templates/KeyboardSafeView';
import PlaceCard from '@components/organisms/PlaceCard';
import Sentence from '@components/molcules/Sentence';
import {RootState} from '@store/reducers';
import {updateMessage, hideMessage} from '@store/actions/navbar';
import {clearRecommendation} from '@store/actions/recommendation';
import {HomeParamList} from '@navigations/Home';
import {CHARACTER_NAME, SCREEN} from '@utils/consts';
import size from '@styles/sizes';

type Status = 'LOADING' | 'SUCCESS' | 'ERROR';

interface Props {
  navigation: BottomTabNavigationProp<
    HomeParamList,
    typeof SCREEN.RECOMMENDATION
  >;
}

const Recommendation: React.FC<Props> = ({navigation}) => {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const {category} = useSelector((state: RootState) => state.case);
  const {recommendation, device} = useSelector((state: RootState) => state);
  const {loading, ...data} = recommendation;
  const startPosition = (size.view.rootHeight - device.messageHeight) * 0.46;
  // useState
  const [status, setStatus] = useState<Status>('LOADING');
  const [translateY] = useState<Animated.Value>(
    new Animated.Value(startPosition),
  );

  const handleDismiss = () => dispatch(clearRecommendation(navigation));

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
        if (recommendation.error) {
          // Failure
          setStatus('ERROR');
          return;
        }
        // Success
        dispatch(hideMessage());
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
    <KeyboardSafeView>
      <Animated.View style={{transform: [{translateY}]}}>
        <Sentence message={getTitle()} />
      </Animated.View>
      {status === 'SUCCESS' && (
        <PlaceCard onDismiss={handleDismiss} {...data} />
      )}
    </KeyboardSafeView>
  );
};

export default Recommendation;
