import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {SCREEN} from '@utils/consts';
import Welcome from '@screens/Welcome';
import Signup from '@screens/Signup';
import SignupMeta from '@screens/SignupMeta';
import Login from '@screens/Login';
import ResetPassword from '@screens/ResetPassword';
import ConfirmEmail from '@screens/ConfirmEmail';
import {SignupReq} from '@services/auth';
import RecommendationDetail, {
  Params as RecommendationDetailParams,
} from '@screens/RecommendationDetail';
import WebView, {Params as WebViewParams} from '@screens/WebView';

type SessionParamList = {
  [SCREEN.WELCOME]: undefined;
  [SCREEN.SIGNUP]: undefined;
  [SCREEN.SIGNUP_META]: SignupReq;
  [SCREEN.LOGIN]: undefined;
  [SCREEN.RESET_PASSWORD]: undefined;
  [SCREEN.CONFIRM_EMAIL]: undefined;
  // OTHERS
  [SCREEN.RECOMMENDATION_DETAIL]: RecommendationDetailParams;
  [SCREEN.WEB_VIEW]: WebViewParams;
};

export type SessionNavigationProp<
  P extends keyof SessionParamList
> = StackNavigationProp<SessionParamList, P>;

export type SessionRouteProp<P extends keyof SessionParamList> = RouteProp<
  SessionParamList,
  P
>;

const Session = createStackNavigator<SessionParamList>();

export default () => (
  <Session.Navigator initialRouteName={SCREEN.WELCOME} headerMode="none">
    <Session.Screen name={SCREEN.WELCOME} component={Welcome} />
    <Session.Screen name={SCREEN.SIGNUP} component={Signup} />
    <Session.Screen name={SCREEN.SIGNUP_META} component={SignupMeta} />
    <Session.Screen name={SCREEN.LOGIN} component={Login} />
    <Session.Screen name={SCREEN.RESET_PASSWORD} component={ResetPassword} />
    <Session.Screen name={SCREEN.CONFIRM_EMAIL} component={ConfirmEmail} />
    {/* OTHERS */}
    <Session.Screen
      name={SCREEN.RECOMMENDATION_DETAIL}
      component={RecommendationDetail}
    />
    <Session.Screen name={SCREEN.WEB_VIEW} component={WebView} />
  </Session.Navigator>
);
