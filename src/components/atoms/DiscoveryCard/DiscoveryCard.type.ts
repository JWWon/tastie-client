import {Discovery} from '@services/discoveries';

import {RootNavigationProp} from '@navigations/Root';
import {SCREEN} from '@utils/consts';

export interface Props extends Discovery {
  navigation: RootNavigationProp<typeof SCREEN.DISCOVERIES>;
}
