import {CommonActions} from '@react-navigation/native';

import {RootNavigationProp} from '@navigations/Root';
import {getInitialLink} from '@utils/dynamicLink';
import {SCREEN} from '@utils/consts';

interface ConfigInterface {
  navigation?: RootNavigationProp<typeof SCREEN.CASE>;
}

const config: ConfigInterface = {};

// NAVIGATION
export function setNavigation(nav: ConfigInterface['navigation']) {
  if (nav) config.navigation = nav;
  getInitialLink(navigate);
}

export function navigate(name: string, params?: object) {
  const action = CommonActions.navigate({name, params});
  config.navigation?.dispatch(action);
}

export function goBack() {
  const action = CommonActions.goBack();
  config.navigation?.dispatch(action);
}
// END NAVIGATION
