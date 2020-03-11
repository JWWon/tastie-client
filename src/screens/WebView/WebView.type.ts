import {SCREEN} from '@utils/consts';
import {RootNavigationProp, RootRouteProp} from '@navigations/Root';

export interface Props {
  navigation: RootNavigationProp<typeof SCREEN.WEB_VIEW>;
  route: RootRouteProp<typeof SCREEN.WEB_VIEW>;
}

export interface Params {
  uri: string;
}
