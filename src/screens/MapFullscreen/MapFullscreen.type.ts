import {DiscoveryDetail} from '@services/discoveries';
import {RootNavigationProp, RootRouteProp} from '@navigations/Root';
import {SCREEN} from '@utils/consts';

export type Params = Pick<
  DiscoveryDetail,
  'location' | 'name' | 'formattedAddress' | 'id'
>;

export interface Props {
  navigation: RootNavigationProp<typeof SCREEN.MAP_FULLSCREEN>;
  route: RootRouteProp<typeof SCREEN.MAP_FULLSCREEN>;
}
