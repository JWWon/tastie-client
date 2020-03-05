import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {NAVIGATOR, SCREEN} from '@utils/consts';
import ContentNavigator, {ContentParamList} from './Content';
import RecommendationDetail, {
  Params as RecommendationDetailParams,
} from '@screens/RecommendationDetail';

type RootParamList = ContentParamList & {
  [NAVIGATOR.CONTENT]: undefined;
  [SCREEN.RECOMMENDATION_DETAIL]: RecommendationDetailParams;
};

export type RootNavigationProp<
  P extends keyof RootParamList
> = StackNavigationProp<RootParamList, P>;

export type RootRouteProp<P extends keyof RootParamList> = RouteProp<
  RootParamList,
  P
>;

const Root = createStackNavigator<RootParamList>();

export default () => (
  <Root.Navigator initialRouteName={NAVIGATOR.CONTENT} headerMode="none">
    <Root.Screen name={NAVIGATOR.CONTENT} component={ContentNavigator} />
    <Root.Screen
      name={SCREEN.RECOMMENDATION_DETAIL}
      component={RecommendationDetail}
    />
  </Root.Navigator>
);
