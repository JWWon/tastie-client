import React from 'react';
import {Region} from 'react-native-maps';

import {Props} from './MapView.type';
import * as s from './MapView.style';

const DELTA = {
  latitudeDelta: 0.005,
  longitudeDelta: 0.012,
};

const initialRegion: Region = {
  // 킹방부
  latitude: 37.530929,
  longitude: 126.976442,
  ...DELTA,
};

const MapView: React.FC<Props> = ({location, address, ...props}) => (
  <s.Container>
    <s.MapView
      {...props}
      provider="google"
      showsUserLocation={true}
      showsMyLocationButton={false}
      initialRegion={initialRegion}
      region={{...location, ...DELTA}}>
      <s.Marker
        anchor={{x: 0.5, y: 1}}
        centerOffset={{x: 0.5, y: 1}}
        coordinate={location}>
        <s.Mascot />
        <s.Stick />
      </s.Marker>
    </s.MapView>
    <s.AddressWrapper>
      <s.Address>{address}</s.Address>
    </s.AddressWrapper>
  </s.Container>
);

export default MapView;
