import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import Navbar from '@components/organisms/Navbar';
import Discoveries from '@screens/Discoveries';
import Case from '@screens/Case';
import History from '@screens/History';
import Profile from '@screens/Profile';
import {RootState} from '@store/reducers';
import {SCREEN} from '@utils/consts';

export type ContentParamList = {
  [SCREEN.CASE]: undefined;
  [SCREEN.DISCOVERIES]: undefined;
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
      <Content.Screen name={SCREEN.DISCOVERIES} component={Discoveries} />
      <Content.Screen name={SCREEN.PROFILE} component={Profile} />
    </Content.Navigator>
  );
};
