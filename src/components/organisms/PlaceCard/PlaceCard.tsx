import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {RootState} from '@store/reducers';
import {clearCase} from '@store/actions/case';
import {updateContent} from '@store/actions/message';
import ImageSwiper from '@components/atoms/ImageSwiper';
import PlaceInfo from '@components/molcules/PlaceInfo';
import * as s from './PlaceCard.style';
import {Props} from './PlaceCard.type';
import consts from '@utils/consts';
import sizes from '@styles/sizes';

const {SCREEN} = consts;

const PlaceCard: React.FC<Props> = ({navigation, photoUrls, ...infos}) => {
  const dispatch = useDispatch();

  const {messageHeight} = useSelector((state: RootState) => state.device);
  const marginBottom = messageHeight - sizes.templatePadding + 16;

  function handleDismiss() {
    dispatch(clearCase());
    dispatch(updateContent({content: '다른 음식이 먹고싶나옹?'}));
    navigation.navigate(SCREEN.CASE);
  }

  return (
    <s.Container style={{marginBottom}}>
      <ImageSwiper images={photoUrls} />
      <s.InfoWrapper>
        <PlaceInfo {...infos} />
      </s.InfoWrapper>
      <s.Dismiss
        onPress={handleDismiss}
        source={require('@assets/images/icon-close/icon-close.png')}
      />
    </s.Container>
  );
};

export default withNavigation(PlaceCard);
