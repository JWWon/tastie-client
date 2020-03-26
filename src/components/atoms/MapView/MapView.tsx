import React from 'react';
import {Region} from 'react-native-maps';

import {Props} from './MapView.type';
import * as s from './MapView.style';

const DELTA = {
  latitudeDelta: 0.003,
  longitudeDelta: 0.006,
};

const initialRegion: Region = {
  // 킹방부
  latitude: 37.530929,
  longitude: 126.976442,
  ...DELTA,
};

/**
 * @IMPORTANT
 * This component needs "View" wrapper while in use
 */
const MapView: React.FC<Props> = ({location, name, children, ...props}) => (
  <s.MapView
    provider="google"
    showsUserLocation={true}
    showsMyLocationButton={false}
    initialRegion={initialRegion}
    region={{...location, ...DELTA}}
    {...props}>
    <s.Marker
      anchor={{x: 0.5, y: 1}}
      centerOffset={{x: 0.5, y: 1}}
      coordinate={location}>
      <s.Mascot />
      <s.Stick />
      <s.Shadow />
    </s.Marker>
    <s.Marker
      anchor={{x: 0.5, y: 0}}
      centerOffset={{x: 0.5, y: 0}}
      coordinate={location}>
      <s.Name>{name}</s.Name>
    </s.Marker>
    {children}
  </s.MapView>
);

export default MapView;
