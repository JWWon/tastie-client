import {ViewProps} from 'react-native';
import {MapViewProps, LatLng} from 'react-native-maps';

export interface Props extends MapViewProps {
  location: LatLng;
  name: string;
  style?: ViewProps;
}
