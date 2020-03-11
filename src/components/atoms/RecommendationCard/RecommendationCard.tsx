import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '@store/reducers';
import {showLikesModal, deleteLike} from '@store/actions/recommendations';
import {selectLikeIcon} from '@utils/helper';
import {SCREEN} from '@utils/consts';
import * as s from './RecommendationCard.style';
import {Props} from './RecommendationCard.type';

const RecommendationCard: React.FC<Props> = ({navigation, ...data}) => {
  const situation = useSelector((state: RootState) => state.case.situation);
  const dispatch = useDispatch();

  const labels = [situation || 'NO_LABEL'];

  function handleNavigate() {
    navigation.navigate(SCREEN.RECOMMENDATION_DETAIL, {placeID: data.id});
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
      <s.BackgroundImage source={{uri: data.photoUrls[0]}} />
      <s.ImageFilter>
        <s.Address>{data.formattedAddress}</s.Address>
        <s.Distance>{data.distance}</s.Distance>

        <s.BottomContent>
          <s.RowContent>
            {labels.map(item => (
              <s.Label key={item}>{item}</s.Label>
            ))}
          </s.RowContent>
          <s.RowContent>
            <s.PlaceName>{data.name}</s.PlaceName>
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

export default RecommendationCard;
