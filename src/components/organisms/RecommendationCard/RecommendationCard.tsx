import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '@store/reducers';
import {getDistance} from '@utils/helper';
import {SCREEN} from '@utils/consts';
import * as s from './RecommendationCard.style';
import {Props} from './RecommendationCard.type';

const icon_like_empty = require('@assets/images/icon-like/icon-like-empty.png');
const icon_like = require('@assets/images/icon-like/icon-like.png');

const RecommendationCard: React.FC<Props> = ({navigation, ...data}) => {
  const [distance, setDistance] = useState<string>('');
  const [isLike, setIsLike] = useState<boolean>(false);
  const userCoords = useSelector((state: RootState) => state.auth.userCoords);
  const situation = useSelector((state: RootState) => state.case.situation);

  const labels = [situation];

  function handlePress() {
    navigation.navigate(SCREEN.RECOMMENDATION_DETAIL, {distance, ...data});
  }

  useEffect(() => setDistance(getDistance(userCoords, data.location)), []);

  return (
    <s.TouchableWrapper onPress={handlePress}>
      <s.BackgroundImage source={{uri: data.photoUrls[0]}} />
      <s.ImageFilter>
        <s.Address>{data.formattedAddress}</s.Address>
        <s.Distance>{distance}</s.Distance>

        <s.BottomContent>
          <s.RowContent>
            {labels.map(item => (
              <s.Label key={item}>{item}</s.Label>
            ))}
          </s.RowContent>
          <s.RowContent>
            <s.PlaceName>{data.name}</s.PlaceName>
            <s.IconButton
              onPress={() => setIsLike(!isLike)}
              source={isLike ? icon_like : icon_like_empty}
            />
          </s.RowContent>
        </s.BottomContent>
      </s.ImageFilter>
    </s.TouchableWrapper>
  );
};

export default RecommendationCard;
