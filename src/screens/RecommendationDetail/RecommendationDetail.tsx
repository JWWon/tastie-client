import React, {useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Share} from 'react-native';
import firebase from '@react-native-firebase/app';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import _ from 'lodash';

import {RootState} from '@store/reducers';
import {EVENT} from '@utils/consts';
import {
  getPriceLevel,
  getTodayOpeningHours,
  makePhoneCall,
  selectLikeIcon,
  getDistance,
} from '@utils/helper';
import * as api from '@services/recommendations';
import {RecommendationDetail as RecommendationDetailProps} from '@services/recommendations';
import RecommendationInfoGrid from '@components/molcules/RecommendationInfoGrid';
import RecommendationInfo, {
  Props as InfoProps,
} from '@components/atoms/RecommendationInfo';
import Dismiss from '@components/atoms/Dismiss';
import ImageCarousel from '@components/atoms/ImageCarousel';
import IconButton from '@components/atoms/IconButton';
import MapView from '@components/atoms/MapView';
import Loading from '@components/atoms/Loading';
import {showLikesModal, deleteLike} from '@store/actions/recommendations';
import {Props, Button} from './RecommendationDetail.type';
import * as s from './RecommendationDetail.style';

const dynamicLinksOption = (
  data: RecommendationDetailProps,
): FirebaseDynamicLinksTypes.DynamicLinkParameters => ({
  link: `https://app.tastie.me/recommendation?placeID=${data.id}`,
  domainUriPrefix: 'https://link.tastie.me',
  analytics: {campaign: 'click_shared_recommendation'},
  social: {
    title: '오늘의 맛집',
    descriptionText: `${data.name} 여기는 어떤가옹?`,
    imageUrl: _.head(data.photoUrls),
  },
  android: {
    packageName: 'me.tastie.client',
    fallbackUrl:
      'https://play.google.com/store/apps/details?id=me.tastie.client',
  },
  ios: {
    bundleId: 'me.tastie.client',
    appStoreId: '1499347694',
  },
});

const initData: RecommendationDetailProps = {
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
  const [data, setData] = useState<RecommendationDetailProps>(initData);
  const [loading, setLoading] = useState<boolean>(true);
  // useSelector
  const likes = useSelector((state: RootState) => state.history.likes);
  const situation = useSelector((state: RootState) => state.case.situation);
  const userCoords = useSelector((state: RootState) => state.auth.userCoords);
  // useDispatch
  const dispatch = useDispatch();

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
  const buttons: Button[] = [
    {
      message: '전화주문',
      icon: require('@assets/images/icon-phone/icon-phone.png'),
      onPress: () => makePhoneCall(data.formattedPhoneNumber),
    },
    {
      message: '공유하기',
      icon: require('@assets/images/icon-share/icon-share.png'),
      onPress: handleShare,
    },
    {
      message: '평가하기',
      icon: selectLikeIcon({positive: data.positive, black: true}),
      onPress: handlePressLike,
    },
  ];

  function handleSelectPositive(positive: boolean) {
    setData({...data, positive});
  }

  async function handleShare() {
    try {
      const links = await dynamicLinks().buildShortLink(
        dynamicLinksOption(data),
      );
      const response = await Share.share({message: links});
      if (response.action === Share.sharedAction && response.activityType) {
        firebase.analytics().logEvent(EVENT.SHARE_RECOMMENDATION, {
          placeID: data.id,
          type: response.activityType,
        });
      }
    } catch (e) {
      console.warn(e);
    }
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
      // Get data directly from API
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
      console.warn(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getRecommendation();
  }, []);

  return (
    <s.Container>
      {loading ? (
        <s.LoadingWrapper>
          <Loading />
        </s.LoadingWrapper>
      ) : (
        <s.Scroll>
          <ImageCarousel photoUrls={data.photoUrls} />
          <s.ContentWrapper>
            <s.HeaderWrapper>
              <s.PlaceName>{data.name}</s.PlaceName>
              <s.LabelWrapper>
                {labels.map(item => (
                  <s.Label key={item}>{item}</s.Label>
                ))}
              </s.LabelWrapper>

              <s.Buttons>
                {buttons.map((item, idx) => (
                  <Fragment key={idx.toString()}>
                    {idx !== 0 && <s.Divider />}
                    <s.ButtonBorder>
                      <IconButton
                        onPress={item.onPress}
                        source={item.icon}
                        message={item.message}
                      />
                    </s.ButtonBorder>
                  </Fragment>
                ))}
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
