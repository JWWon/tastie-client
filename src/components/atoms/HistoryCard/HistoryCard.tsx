import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import _ from 'lodash';

import Loading from '@components/atoms/Loading';
import {setDiscoveryCardData} from '@store/actions/history';
import {navigate} from '@utils/RootService';
import {SCREEN} from '@utils/consts';
import * as s from './HistoryCard.style';
import {Props, EmptyProps} from './HistoryCard.type';
import {selectLikeIcon} from '@utils/helper';

export const HistoryEmpty: React.FC<EmptyProps> = ({id}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDiscoveryCardData.request(id));
  }, []);

  return (
    <s.Link disabled={true}>
      <s.LoadingWrapper>
        <Loading />
      </s.LoadingWrapper>
    </s.Link>
  );
};

const HistoryFull: React.FC<Props> = data => (
  <s.Link onPress={() => navigate(SCREEN.DISCOVERY_DETAIL, {placeID: data.id})}>
    <s.Image source={{uri: _.head(data.photoUrls)}} />

    <s.ImageFilter>
      <s.Address>{data.formattedAddress}</s.Address>
      <s.PlaceName>{data.name}</s.PlaceName>
    </s.ImageFilter>

    <s.LikeIcon
      source={selectLikeIcon({positive: data.positive})}
      onPress={() => {}}
    />
  </s.Link>
);

export default HistoryFull;
