import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import Navbar from '@components/organisms/Navbar';
import CaseScreen from '@screens/Case';
import RecommendationScreen from '@screens/Recommendation';
import {RootState} from '@store/reducers';
import {SCREEN} from '@utils/consts';

export type HomeParamList = {
  [SCREEN.CASE]: undefined;
  [SCREEN.RECOMMENDATION]: undefined;
};

const Home = createBottomTabNavigator<HomeParamList>();

export default () => {
  const {keyboardVisible} = useSelector((state: RootState) => state.device);

  return (
    <Home.Navigator
      initialRouteName={SCREEN.CASE}
      tabBar={() => (!keyboardVisible ? <Navbar /> : null)}
      backBehavior="initialRoute">
      <Home.Screen name={SCREEN.CASE} component={CaseScreen} />
      <Home.Screen
        name={SCREEN.RECOMMENDATION}
        component={RecommendationScreen}
      />
    </Home.Navigator>
  );
};
