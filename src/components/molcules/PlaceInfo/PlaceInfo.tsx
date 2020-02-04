import React from 'react';

import ImageButton from '@components/atoms/ImageButton';
import {Props} from './PlaceInfo.type';
import * as s from './PlaceInfo.style';

const PlaceInfo: React.FC<Props> = ({
  name,
  categories,
  distance,
  phone,
  address,
}) => (
  <s.Container>
    <s.Header>
      <s.Name>{name}</s.Name>
      <s.DynamicInfo>
        <s.Category>{categories?.join(', ')}</s.Category>
        <s.Distance>{distance}m</s.Distance>
      </s.DynamicInfo>
      <s.ButtonWrapper>
        <ImageButton
          onPress={() => {
            console.log(phone);
          }}
          source={require('@assets/images/icon-phone/icon-phone.png')}
        />
        <ImageButton
          onPress={() => {
            console.log(address);
          }}
          source={require('@assets/images/icon-pin/icon-pin.png')}
        />
      </s.ButtonWrapper>
      <s.StaticInfo>
        <s.StaticInfoRow>
          <s.InfoType>가격대 (1인)</s.InfoType>
          <s.InfoContent>1만원 - 2만원</s.InfoContent>
        </s.StaticInfoRow>
      </s.StaticInfo>
    </s.Header>
  </s.Container>
);

export default PlaceInfo;
