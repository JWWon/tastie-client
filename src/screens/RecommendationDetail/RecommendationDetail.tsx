import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import {RootNavigationProp, RootRouteProp} from '@navigations/Root';
import {RootState} from '@store/reducers';
import {SCREEN} from '@utils/consts';
import {
  getPriceLevel,
  getTodayOpeningHours,
  makePhoneCall,
  selectLikeIcon,
  getDistance,
} from '@utils/helper';
import * as api from '@services/recommendations';
import {Recommendation} from '@services/recommendations';
import RecommendationInfoGrid from '@components/molcules/RecommendationInfoGrid';
import RecommendationInfo, {
  Props as InfoProps,
} from '@components/atoms/RecommendationInfo';
import Dismiss from '@components/atoms/Dismiss';
import ImageSwiper from '@components/atoms/ImageSwiper';
import IconButton from '@components/atoms/IconButton';
import MapView from '@components/atoms/MapView';
import Loading from '@components/atoms/Loading';
import {showLikesModal, deleteLike} from '@store/actions/recommendations';
import * as s from './RecommendationDetail.style';

export interface Props {
  navigation: RootNavigationProp<typeof SCREEN.RECOMMENDATION_DETAIL>;
  route: RootRouteProp<typeof SCREEN.RECOMMENDATION_DETAIL>;
}

const initData: Recommendation = {
  id: '',
  name: '',
  rating: 0,
  userRatingsTotal: 0,
  priceLevel: 0,
  types: [],
  location: {latitude: 0, longitude: 0},
  formattedAddress: '',
  formattedPhoneNumber: '',
  website: '',
  photoUrls: [],
  openingHours: {
    openNow: false,
  },
};

const RecommendationDetail: React.FC<Props> = ({navigation, route}) => {
  // useState
  const [data, setData] = useState<Recommendation>(initData);
  const [loading, setLoading] = useState<boolean>(true);
  // useSelector
  const likes = useSelector((state: RootState) => state.history.likes);
  const situation = useSelector((state: RootState) => state.case.situation);
  const userCoords = useSelector((state: RootState) => state.auth.userCoords);
  // useDispatch
  const dispatch = useDispatch();

  // TODO: Get multiple labels from backend
  const labels = [situation || 'No Tags'];

  const recommendationInfo: InfoProps[] = [
    {
      title: '나와의 거리',
      icon: require('@assets/images/icon-distance/icon-distance.png'),
      data: data.distance || '알 수 없음',
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

  function handleSelectPositive(positive: boolean) {
    setData({...data, positive});
  }

  function handlePressLike() {
    if (data.positive !== undefined) {
      // delete current like
      dispatch(deleteLike.request({placeID: data.id}));
      setData({...data, positive: undefined});
    } else {
      dispatch(
        showLikesModal({
          selectedID: data.id,
          onSelectPositive: handleSelectPositive,
        }),
      );
    }
  }

  async function getRecommendation() {
    const {placeID} = route.params;
    try {
      const response = await api.getRecommendation(placeID);
      const likeIdx = _.findIndex(likes, like => like.placeID === placeID);

      const recommendation = {...response.data};
      if (userCoords.latitude !== 0 && userCoords.longitude !== 0)
        recommendation.distance = getDistance(
          response.data.location,
          userCoords,
        );
      if (likeIdx > -1) recommendation.positive = likes[likeIdx].positive;

      setData(recommendation);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getRecommendation();
  }, []);

  // TODO: Handle loading view
  return (
    <s.Container>
      {loading ? (
        <s.LoadingWrapper>
          <Loading />
        </s.LoadingWrapper>
      ) : (
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
      )}
      {/* position: fixed */}
      <s.DismissSafe>
        <Dismiss icon="arrow" onPress={() => navigation.goBack()} />
      </s.DismissSafe>
    </s.Container>
  );
};

export default RecommendationDetail;
