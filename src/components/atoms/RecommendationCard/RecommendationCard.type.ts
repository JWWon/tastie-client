import {Recommendation} from '@services/recommendations';

import {RootNavigationProp} from '@navigations/Root';
import {SCREEN} from '@utils/consts';

export interface Props extends Recommendation {
  navigation: RootNavigationProp<typeof SCREEN.RECOMMENDATIONS>;
}
