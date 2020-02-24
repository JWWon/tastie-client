import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SCREEN} from '@utils/consts';
import Welcome from '@screens/Welcome';

export type SessionParamList = {
  [SCREEN.WELCOME]: undefined;
};

const Session = createStackNavigator<SessionParamList>();

export default () => (
  <Session.Navigator initialRouteName={SCREEN.WELCOME} headerMode="float">
    <Session.Screen
      name={SCREEN.WELCOME}
      component={Welcome}
      options={{headerShown: false}}
    />
  </Session.Navigator>
);
