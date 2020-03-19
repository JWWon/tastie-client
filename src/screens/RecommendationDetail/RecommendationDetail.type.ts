import {ImageSourcePropType} from 'react-native';

import {RootNavigationProp, RootRouteProp} from '@navigations/Root';
import {SCREEN} from '@utils/consts';

export interface Params {
  placeID: string;
}

export interface Button {
  onPress: () => void;
  icon: ImageSourcePropType;
  message: string;
}

export interface Props {
  navigation: RootNavigationProp<typeof SCREEN.RECOMMENDATION_DETAIL>;
  route: RootRouteProp<typeof SCREEN.RECOMMENDATION_DETAIL>;
}
