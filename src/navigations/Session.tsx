import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SCREEN} from '@utils/consts';
import Welcome from '@screens/Welcome';
import Signup from '@screens/Signup';

export type SessionParamList = {
  [SCREEN.WELCOME]: undefined;
  [SCREEN.SIGNUP]: undefined;
};

const Session = createStackNavigator<SessionParamList>();

export default () => (
  <Session.Navigator initialRouteName={SCREEN.WELCOME} headerMode="none">
    <Session.Screen name={SCREEN.WELCOME} component={Welcome} />
    <Session.Screen name={SCREEN.SIGNUP} component={Signup} />
  </Session.Navigator>
);
