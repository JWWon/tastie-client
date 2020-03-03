import {CommonActions} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {HomeParamList} from '@navigations/Home';
import {SCREEN} from '@utils/consts';

interface ConfigInterface {
  navigation?: BottomTabNavigationProp<HomeParamList, typeof SCREEN.CASE>;
}

const config: ConfigInterface = {};

// NAVIGATION
export function setNavigation(nav: ConfigInterface['navigation']) {
  if (nav) config.navigation = nav;
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
