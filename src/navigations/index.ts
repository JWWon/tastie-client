import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Navbar from '@components/organisms/Navbar';
import CaseScreen from '@screens/Case';
import RecommendScreen from '@screens/Recommend';
import consts from '@utils/consts';

const {SCREEN} = consts;

const RootNavigator = createBottomTabNavigator(
  {
    [SCREEN.CASE]: CaseScreen,
    [SCREEN.RECOMMEND]: RecommendScreen,
  },
  {
    initialRouteName: SCREEN.CASE,
    tabBarComponent: Navbar,
  },
);

export default createAppContainer(RootNavigator);
