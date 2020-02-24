import React from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '@store/reducers';
import ImageSwiper from '@components/atoms/ImageSwiper';
import PlaceInfo from '@components/molcules/PlaceInfo';
import * as s from './PlaceCard.style';
import {Props} from './PlaceCard.type';

const PlaceCard: React.FC<Props> = ({onDismiss, photoUrls, ...infos}) => {
  const {messageHeight: marginBottom} = useSelector(
    (state: RootState) => state.device,
  );

  return (
    <s.Container style={{marginBottom}}>
      <ImageSwiper images={photoUrls} />
      <s.InfoWrapper>
        <PlaceInfo {...infos} />
      </s.InfoWrapper>
      <s.Dismiss
        onPress={onDismiss}
        source={require('@assets/images/icon-close/icon-close.png')}
      />
    </s.Container>
  );
};

export default PlaceCard;
