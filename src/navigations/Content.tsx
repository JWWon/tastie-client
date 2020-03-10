import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import Navbar from '@components/organisms/Navbar';
import Recommendations from '@screens/Recommendations';
import Case from '@screens/Case';
import History from '@screens/History';
import {RootState} from '@store/reducers';
import {SCREEN} from '@utils/consts';

export type ContentParamList = {
  [SCREEN.CASE]: undefined;
  [SCREEN.RECOMMENDATIONS]: undefined;
  [SCREEN.HISTORY]: undefined;
  [SCREEN.PROFILE]: undefined;
};

const Content = createBottomTabNavigator<ContentParamList>();

export default () => {
  const hideTabBar = useSelector(
    (state: RootState) => state.device.keyboardVisible,
  );

  return (
    <Content.Navigator
      initialRouteName={SCREEN.CASE}
      tabBar={() => (hideTabBar ? null : <Navbar />)}
      backBehavior="initialRoute">
      <Content.Screen name={SCREEN.HISTORY} component={History} />
      <Content.Screen name={SCREEN.CASE} component={Case} />
      <Content.Screen
        name={SCREEN.RECOMMENDATIONS}
        component={Recommendations}
      />
    </Content.Navigator>
  );
};
