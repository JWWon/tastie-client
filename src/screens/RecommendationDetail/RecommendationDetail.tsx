import React from 'react';
import {useSelector} from 'react-redux';

import {RootNavigationProp, RootRouteProp} from '@navigations/Root';
import {RootState} from '@store/reducers';
import {SCREEN} from '@utils/consts';
import {
  getPriceLevel,
  getTodayOpeningHours,
  makePhoneCall,
} from '@utils/helper';
import RecommendationInfoGrid from '@components/molcules/RecommendationInfoGrid';
import RecommendationInfo, {
  Props as InfoProps,
} from '@components/atoms/RecommendationInfo';
import Dismiss from '@components/atoms/Dismiss';
import ImageSwiper from '@components/atoms/ImageSwiper';
import IconButton from '@components/atoms/IconButton';
import MapView from '@components/atoms/MapView';
import * as s from './RecommendationDetail.style';

export interface Props {
  navigation: RootNavigationProp<typeof SCREEN.RECOMMENDATION_DETAIL>;
  route: RootRouteProp<typeof SCREEN.RECOMMENDATION_DETAIL>;
}

const RecommendationDetail: React.FC<Props> = ({navigation, route}) => {
  const {
    photoUrls,
    name,
    distance,
    priceLevel,
    openingHours,
    location,
    formattedAddress,
    formattedPhoneNumber,
  } = route.params;
  const situation = useSelector((state: RootState) => state.case.situation);

  // TODO: Get multiple labels from backend
  const labels = [situation];
  const recommendationInfo: InfoProps[] = [
    {
      title: '나와의 거리',
      icon: require('@assets/images/icon-distance/icon-distance.png'),
      data: distance,
    },
    {
      title: '가격대',
      icon: require('@assets/images/icon-price/icon-price.png'),
      data: getPriceLevel(priceLevel),
    },
    {
      title: '영업 여부',
      icon: require('@assets/images/icon-open/icon-open.png'),
      data: openingHours.openNow ? '영업중' : '영업 준비중',
    },
    {
      title: '영업 시간',
      icon: require('@assets/images/icon-clock/icon-clock.png'),
      data: getTodayOpeningHours(openingHours.weekdayText),
    },
  ];

  return (
    <s.Container>
      <s.Scroll>
        <s.SwiperWrapper>
          <ImageSwiper images={photoUrls} />
        </s.SwiperWrapper>
        <s.ContentWrapper>
          <s.HeaderWrapper>
            <s.PlaceName>{name}</s.PlaceName>
            <s.LabelWrapper>
              {labels.map(item => (
                <s.Label key={item}>{item}</s.Label>
              ))}
            </s.LabelWrapper>

            <s.Buttons>
              <s.ButtonBorder>
                <IconButton
                  onPress={() => makePhoneCall(formattedPhoneNumber)}
                  source={require('@assets/images/icon-phone/icon-phone.png')}
                  message="전화주문"
                />
              </s.ButtonBorder>
              <s.Divider />
              <s.ButtonBorder>
                <IconButton
                  onPress={() => {}}
                  source={require('@assets/images/icon-like/icon-like-empty-black.png')}
                  message="평가하기"
                />
              </s.ButtonBorder>
            </s.Buttons>
          </s.HeaderWrapper>

          <RecommendationInfoGrid data={recommendationInfo}>
            <RecommendationInfo
              title="식당 위치"
              icon={require('@assets/images/icon-location/icon-location.png')}>
              <MapView location={location} address={formattedAddress} />
            </RecommendationInfo>
          </RecommendationInfoGrid>
        </s.ContentWrapper>
      </s.Scroll>
      {/* position: fixed */}
      <s.DismissSafe>
        <Dismiss icon="arrow" onPress={() => navigation.goBack()} />
      </s.DismissSafe>
    </s.Container>
  );
};

export default RecommendationDetail;
