import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '@store/reducers';
import {showLikesModal, deleteLike} from '@store/actions/discoveries';
import {selectLikeIcon} from '@utils/helper';
import {SCREEN} from '@utils/consts';
import * as s from './DiscoveryCard.style';
import {Props} from './DiscoveryCard.type';

const DiscoveryCard: React.FC<Props> = ({navigation, ...data}) => {
  const situation = useSelector((state: RootState) => state.case.situation);
  const dispatch = useDispatch();

  const labels = [situation || 'NO_LABEL'];

  function handleNavigate() {
    navigation.navigate(SCREEN.DISCOVERY_DETAIL, {placeID: data.id});
  }

  function handlePressLike() {
    if (data.positive !== undefined) {
      // delete current like
      dispatch(deleteLike.request({placeID: data.id}));
    } else {
      dispatch(showLikesModal({selectedID: data.id}));
    }
  }

  return (
    <s.TouchableWrapper onPress={handleNavigate}>
      <s.BackgroundImage source={{uri: data.photoUrl}} />
      <s.ImageFilter>
        <s.Address>{data.address}</s.Address>
        <s.Distance>
          {data.distance || '얼마나 멀리 있는지 몰라요..'}
        </s.Distance>

        <s.BottomContent>
          <s.RowContent>
            {labels.map(item => (
              <s.Label key={item}>{item}</s.Label>
            ))}
          </s.RowContent>
          <s.RowContent>
            <s.PlaceName>{data.name || '???'}</s.PlaceName>
            <s.IconButton
              source={selectLikeIcon({positive: data.positive})}
              onPress={handlePressLike}
            />
          </s.RowContent>
        </s.BottomContent>
      </s.ImageFilter>
    </s.TouchableWrapper>
  );
};

export default DiscoveryCard;
