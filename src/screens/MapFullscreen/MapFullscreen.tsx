import React from 'react';

import MapView from '@components/atoms/MapView';
import Dismiss from '@components/atoms/Dismiss';
import LocationMenu from '@components/atoms/LocationMenu';
import {Props} from './MapFullscreen.type';
import * as s from './MapFullscreen.style';

const FullscreenMap: React.FC<Props> = ({navigation, route}) => {
  const {location, name, id, formattedAddress} = route.params;

  function handleDismiss() {
    navigation.goBack();
  }

  return (
    <s.Container>
      <MapView location={location} name={name} />
      <s.SafeAreaView>
        <Dismiss icon="arrow" onPress={handleDismiss} />
      </s.SafeAreaView>
      <s.SafeAreaBottom>
        <s.MenuWrapper>
          <LocationMenu placeID={id} address={formattedAddress} />
        </s.MenuWrapper>
      </s.SafeAreaBottom>
    </s.Container>
  );
};

export default FullscreenMap;
