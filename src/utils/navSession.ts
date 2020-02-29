import {CommonActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {SessionParamList} from '@navigations/Session';

type Navigation = StackNavigationProp<SessionParamList, 'Welcome'>;

const config: {navigation?: Navigation} = {};

export function setNavigation(nav: Navigation) {
  if (nav) config.navigation = nav;
}

export function navigate(name: string, params: object) {
  if (config.navigation && name) {
    const action = CommonActions.navigate({name, params});
    config.navigation.dispatch(action);
  }
}
export function goBack() {
  if (config.navigation) {
    const action = CommonActions.goBack();
    config.navigation.dispatch(action);
  }
}
