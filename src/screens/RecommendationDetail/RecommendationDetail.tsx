import React from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';

import {RootNavigationProp, RootRouteProp} from '@navigations/Root';
import {RootState} from '@store/reducers';
import {SCREEN} from '@utils/consts';
import {
  getPriceLevel,
  getTodayOpeningHours,
  makePhoneCall,
  selectLikeIcon,
} from '@utils/helper';
import RecommendationInfoGrid from '@components/molcules/RecommendationInfoGrid';
import RecommendationInfo, {
  Props as InfoProps,
} from '@components/atoms/RecommendationInfo';
import Dismiss from '@components/atoms/Dismiss';
import ImageSwiper from '@components/atoms/ImageSwiper';
import IconButton from '@components/atoms/IconButton';
import MapView from '@components/atoms/MapView';
import {showLikesModal, deleteLike} from '@store/actions/recommendations';
import * as s from './RecommendationDetail.style';

export interface Props {
  navigation: RootNavigationProp<typeof SCREEN.RECOMMENDATION_DETAIL>;
  route: RootRouteProp<typeof SCREEN.RECOMMENDATION_DETAIL>;
}

const RecommendationDetail: React.FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const situation = useSelector((state: RootState) => state.case.situation);
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.data,
  );
  const dispatch = useDispatch();

  const idx = _.findIndex(recommendations, item => item.id === id);
  const data = recommendations[idx];

  // TODO: Get multiple labels from backend
  const labels = [situation];
  const recommendationInfo: InfoProps[] = [
    {
      title: '나와의 거리',
      icon: require('@assets/images/icon-distance/icon-distance.png'),
      data: data.distance,
    },
    {
      title: '가격대',
      icon: require('@assets/images/icon-price/icon-price.png'),
      data: getPriceLevel(data.priceLevel),
    },
    {
      title: '영업 여부',
      icon: require('@assets/images/icon-open/icon-open.png'),
      data: data.openingHours.openNow ? '영업중' : '영업 준비중',
    },
    {
      title: '영업 시간',
      icon: require('@assets/images/icon-clock/icon-clock.png'),
      data: getTodayOpeningHours(data.openingHours.weekdayText),
    },
  ];

  function handlePressLike() {
    if (data.positive !== undefined) {
      // delete current like
      dispatch(deleteLike.request({placeID: data.id}));
    } else {
      dispatch(showLikesModal({selectedID: data.id}));
    }
  }

  return (
    <s.Container>
      <s.Scroll>
        <s.SwiperWrapper>
          <ImageSwiper images={data.photoUrls} />
        </s.SwiperWrapper>
        <s.ContentWrapper>
          <s.HeaderWrapper>
            <s.PlaceName>{data.name}</s.PlaceName>
            <s.LabelWrapper>
              {labels.map(item => (
                <s.Label key={item}>{item}</s.Label>
              ))}
            </s.LabelWrapper>

            <s.Buttons>
              <s.ButtonBorder>
                <IconButton
                  onPress={() => makePhoneCall(data.formattedPhoneNumber)}
                  source={require('@assets/images/icon-phone/icon-phone.png')}
                  message="전화주문"
                />
              </s.ButtonBorder>
              <s.Divider />
              <s.ButtonBorder>
                <IconButton
                  onPress={handlePressLike}
                  source={selectLikeIcon({
                    positive: data.positive,
                    black: true,
                  })}
                  message="평가하기"
                />
              </s.ButtonBorder>
            </s.Buttons>
          </s.HeaderWrapper>

          <RecommendationInfoGrid data={recommendationInfo}>
            <RecommendationInfo
              title="식당 위치"
              icon={require('@assets/images/icon-location/icon-location.png')}>
              <MapView
                location={data.location}
                address={data.formattedAddress}
              />
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
