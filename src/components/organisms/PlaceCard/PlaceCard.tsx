import React from 'react';
import {useSelector} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {RootState} from '@store/reducers';
import ImageSwiper from '@components/atoms/ImageSwiper';
import PlaceInfo from '@components/molcules/PlaceInfo';
import * as s from './PlaceCard.style';
import {Props} from './PlaceCard.type';
import consts from '@utils/consts';
import sizes from '@styles/sizes';

const {SCREEN} = consts;

const PlaceCard: React.FC<Props> = ({images, navigation}) => {
  const {messageHeight} = useSelector((state: RootState) => state.device);
  const marginBottom = messageHeight - sizes.templatePadding + 16;

  function handleDismiss() {
    navigation.navigate(SCREEN.CASE);
  }

  return (
    <s.Container style={{marginBottom}}>
      <ImageSwiper images={images} />
      <s.InfoWrapper>
        <PlaceInfo
          name="Shake Shack Burger"
          categories={['햄버거', '기다려서 먹는']}
          distance={300}
          phone="010-0000-0000"
          address="서울시 이태원로 22"
          priceLevel={1}
        />
      </s.InfoWrapper>
      <s.Dismiss
        onPress={handleDismiss}
        source={require('@assets/images/icon-close/icon-close.png')}
      />
    </s.Container>
  );
};

export default withNavigation(PlaceCard);
