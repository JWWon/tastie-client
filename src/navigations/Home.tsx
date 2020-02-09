import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Navbar from '@components/organisms/Navbar';
import CaseScreen from '@screens/Case';
import RecommendScreen from '@screens/Recommend';
import consts from '@utils/consts';

const {SCREEN} = consts;

export type HomeParamList = {
  [SCREEN.CASE]: undefined;
  [SCREEN.RECOMMEND]: undefined;
};

const Home = createBottomTabNavigator<HomeParamList>();

export default () => (
  <Home.Navigator
    initialRouteName={SCREEN.CASE}
    tabBar={() => <Navbar />}
    backBehavior="initialRoute">
    <Home.Screen name={SCREEN.CASE} component={CaseScreen} />
    <Home.Screen name={SCREEN.RECOMMEND} component={RecommendScreen} />
  </Home.Navigator>
);
