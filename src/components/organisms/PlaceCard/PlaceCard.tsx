import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '@store/reducers';
import {getDistance} from '@utils/helper';
import * as s from './PlaceCard.style';
import {Props} from './PlaceCard.type';

const PlaceCard: React.FC<Props> = ({
  photoUrls,
  formattedAddress,
  location,
  name,
}) => {
  const [distance, setDistance] = useState<string>('');
  const userCoords = useSelector((state: RootState) => state.auth.userCoords);
  const situation = useSelector((state: RootState) => state.case.situation);

  const labels = [situation];

  useEffect(() => setDistance(getDistance(userCoords, location)), []);

  return (
    <s.ImageWrapper source={{uri: photoUrls[0]}}>
      <s.ImageFilter>
        <s.Address>{formattedAddress}</s.Address>
        <s.Distance>{distance}</s.Distance>

        <s.BottomContent>
          <s.RowContent>
            {labels.map(item => (
              <s.Label key={item}>{item}</s.Label>
            ))}
          </s.RowContent>
          <s.RowContent>
            <s.PlaceName>{name}</s.PlaceName>
          </s.RowContent>
        </s.BottomContent>
      </s.ImageFilter>
    </s.ImageWrapper>
  );
};

export default PlaceCard;
