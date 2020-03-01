import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SCREEN} from '@utils/consts';
import Welcome from '@screens/Welcome';
import Signup from '@screens/Signup';
import SignupMeta from '@screens/SignupMeta';
import Login from '@screens/Login';
import {SignupReq} from '@services/auth';

export type SessionParamList = {
  [SCREEN.WELCOME]: undefined;
  [SCREEN.SIGNUP]: undefined;
  [SCREEN.SIGNUP_META]: SignupReq;
  [SCREEN.LOGIN]: undefined;
};

const Session = createStackNavigator<SessionParamList>();

export default () => (
  <Session.Navigator initialRouteName={SCREEN.WELCOME} headerMode="none">
    <Session.Screen name={SCREEN.WELCOME} component={Welcome} />
    <Session.Screen name={SCREEN.SIGNUP} component={Signup} />
    <Session.Screen name={SCREEN.SIGNUP_META} component={SignupMeta} />
    <Session.Screen name={SCREEN.LOGIN} component={Login} />
  </Session.Navigator>
);
