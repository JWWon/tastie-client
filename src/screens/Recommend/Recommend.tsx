import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import Home from '@components/templates/Home';
import PlaceCard from '@components/organisms/PlaceCard';
import Sentence from '@components/molcules/Sentence';
import {RootState} from '@store/reducers';
import {updateContent, hideMessage} from '@store/actions/message';
import {clearRecommend} from '@store/actions/recommend';
import {HomeParamList} from '@navigations/Home';
import consts from '@utils/consts';

type Status = 'LOADING' | 'SUCCESS' | 'ERROR';

interface Props {
  navigation: BottomTabNavigationProp<HomeParamList, 'Recommend'>;
}

const {CHARACTER_NAME} = consts;

const Recommend: React.FC<Props> = ({navigation}) => {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const {category} = useSelector((state: RootState) => state.case);
  const {recommend, device} = useSelector((state: RootState) => state);
  const {loading, ...data} = recommend;
  const startPosition = device.homeHeight / 2 - 48;
  // useState
  const [status, setStatus] = useState<Status>('LOADING');
  const [translateY] = useState<Animated.Value>(
    new Animated.Value(startPosition),
  );

  const handleDismiss = () => dispatch(clearRecommend(navigation));

  function getTitle() {
    switch (status) {
      case 'LOADING':
        return `<b>${CHARACTER_NAME}</b>가 정하는 중이에요...`;
      case 'SUCCESS':
        return `오늘 <b>${category}</b>은 이거애옹!`;
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
        if (recommend.error) {
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
          dispatch(updateContent({content: '맘에 들었다면 츄르를 달라옹!'}));
          setStatus('SUCCESS');
        });
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Home>
      <Animated.View style={{transform: [{translateY}]}}>
        <Sentence message={getTitle()} />
      </Animated.View>
      {status === 'SUCCESS' && (
        <PlaceCard onDismiss={handleDismiss} {...data} />
      )}
    </Home>
  );
};

export default Recommend;
