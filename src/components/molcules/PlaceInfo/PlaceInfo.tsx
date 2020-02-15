import React from 'react';
import {FlatList} from 'react-native';
import moment from 'moment';

import ImageButton from '@components/atoms/ImageButton';
import {makePhoneCall, openNaverMap} from '@utils/helper';
import {Props} from './PlaceInfo.type';
import * as s from './PlaceInfo.style';

interface StaticInfo {
  type: string;
  content: string;
}

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

const getTodayOpeningHours = (hours?: string[]) => {
  const today = (moment().weekday() + 6) % 7;
  return hours && typeof hours[today] === 'string'
    ? hours[today].split(': ')[1]
    : '';
};

const PlaceInfo: React.FC<Props> = ({
  name,
  distance,
  location,
  formattedPhoneNumber,
  formattedAddress,
  priceLevel,
  openingHours,
}) => {
  const staticInfos: StaticInfo[] = [
    {
      type: '가격대',
      content: priceMessage(priceLevel),
    },
    {
      type: '영업 시간',
      content: getTodayOpeningHours(openingHours.weekdayText),
    },
    {
      type: '영업 여부',
      content: openingHours.openNow ? '영업중' : '준비중',
    },
  ];

  const renderStaticInfo = ({item}: {item: StaticInfo}) =>
    item.content ? (
      <s.StaticInfoRow>
        <s.InfoType>{item.type}</s.InfoType>
        <s.InfoContent>{item.content}</s.InfoContent>
      </s.StaticInfoRow>
    ) : null;

  return (
    <s.Container>
      <s.Name>{name}</s.Name>
      <s.DynamicInfo>
        <s.Types>{formattedAddress}</s.Types>
        <s.Distance>{distance}</s.Distance>
      </s.DynamicInfo>
      <s.ButtonWrapper>
        <ImageButton
          onPress={() => makePhoneCall(formattedPhoneNumber)}
          source={require('@assets/images/icon-phone/icon-phone.png')}
        />
        <ImageButton
          onPress={() => openNaverMap({name, ...location})}
          source={require('@assets/images/icon-pin/icon-pin.png')}
        />
      </s.ButtonWrapper>
      <s.StaticInfo>
        <FlatList<StaticInfo>
          data={staticInfos}
          renderItem={renderStaticInfo}
          keyExtractor={item => item.type}
        />
      </s.StaticInfo>
    </s.Container>
  );
};

export default PlaceInfo;
