import React, {Fragment} from 'react';
import {Clipboard, Alert, ImageSourcePropType} from 'react-native';

import {openGoogleMap} from '@utils/helper';
import {Props} from './LocationMenu.type';
import * as s from './LocationMenu.style';

interface Data {
  message: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

/**
 * @IMPORTANT
 * This component needs "View" wrapper while in use
 */
const LocationMenu: React.FC<Props> = ({placeID, address}) => {
  const data: Data[] = [
    {
      message: '길찾기',
      icon: require('@assets/images/icon-navigate/icon-navigate.png'),
      onPress: () => openGoogleMap({address, placeID}),
    },
    {
      message: '주소 복사',
      icon: require('@assets/images/icon-copy/icon-copy.png'),
      onPress: () => {
        Clipboard.setString(address);
        Alert.alert('주소를 복사했습니다');
      },
    },
  ];

  return (
    <s.Container>
      {data.map((item, idx) => (
        <Fragment key={idx.toString()}>
          {idx !== 0 && <s.Divider />}
          <s.Button onPress={item.onPress}>
            <s.Icon source={item.icon} message={item.message} />
          </s.Button>
        </Fragment>
      ))}
    </s.Container>
  );
};

export default LocationMenu;
