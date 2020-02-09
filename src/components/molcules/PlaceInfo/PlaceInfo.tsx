import React from 'react';

import ImageButton from '@components/atoms/ImageButton';
import {Props} from './PlaceInfo.type';
import * as s from './PlaceInfo.style';

function priceMessage(level: number) {
  switch (level) {
    case 0:
      return '5000원 미만';
    case 1:
      return '5000원 - 1만원';
    case 2:
      return '1만원 - 2만원';
    case 3:
      return '2만원 - 5만원';
    case 4:
      return '5만원 이상';
    default:
      return '알 수 없음';
  }
}

const PlaceInfo: React.FC<Props> = ({
  name,
  types,
  location,
  formattedPhoneNumber,
  formattedAddress,
  priceLevel,
  openingHours,
}) => (
  <s.Container>
    <s.Header>
      <s.Name>{name}</s.Name>
      <s.DynamicInfo>
        <s.Types>{types?.join(', ')}</s.Types>
        {/* TODO: calculate distance by location */}
        <s.Distance>300m</s.Distance>
      </s.DynamicInfo>
      <s.ButtonWrapper>
        <ImageButton
          onPress={() => {
            // TODO: link phone number with action
          }}
          source={require('@assets/images/icon-phone/icon-phone.png')}
        />
        <ImageButton
          onPress={() => {
            // TODO: link address with maps
          }}
          source={require('@assets/images/icon-pin/icon-pin.png')}
        />
      </s.ButtonWrapper>
      <s.StaticInfo>
        {priceLevel !== undefined && (
          <s.StaticInfoRow>
            <s.InfoType>가격대</s.InfoType>
            <s.InfoContent>{priceMessage(priceLevel)}</s.InfoContent>
          </s.StaticInfoRow>
        )}
        <s.StaticInfoRow>
          <s.InfoType>영업 여부</s.InfoType>
          <s.InfoContent>
            {openingHours.openNow ? '영업중' : '준비중'}
          </s.InfoContent>
        </s.StaticInfoRow>
      </s.StaticInfo>
    </s.Header>
  </s.Container>
);

export default PlaceInfo;
