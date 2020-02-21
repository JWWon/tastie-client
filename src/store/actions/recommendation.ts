import {ActionType, createAsyncAction, createAction} from 'typesafe-actions';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AxiosError} from 'axios';

import {HomeParamList} from '@navigations/Home';
import {RecommendationState} from '@store/reducers/recommendation';
import {SCREEN} from '@utils/consts';

// GET_RECOMMEND
export const GET_RECOMMENDATION = '@recommend/GET_RECOMMENDATION_REQUEST';
export const GET_RECOMMENDATION_SUCCESS =
  '@recommend/GET_RECOMMENDATION_SUCCESS';
export const GET_RECOMMENDATION_FAILURE =
  '@recommend/GET_RECOMMENDATION_FAILURE';

export const getRecommendation = createAsyncAction(
  GET_RECOMMENDATION,
  GET_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATION_FAILURE,
)<
  BottomTabNavigationProp<HomeParamList, 'Case'>,
  Omit<RecommendationState, 'loading'>,
  AxiosError
>();
// END GET_RECOMMEND

// CLEAR_RECOMMEND
export const CLEAR_RECOMMENDATION = '@recommend/CLEAR_RECOMMENDATION';

export const clearRecommendation = createAction(
  CLEAR_RECOMMENDATION,
  (
    payload: BottomTabNavigationProp<
      HomeParamList,
      typeof SCREEN.RECOMMENDATION
    >,
  ) => payload,
)();
// END CLEAR_RECOMMEND

const actions = {getRecommendation, clearRecommendation};
export type RecommendAction = ActionType<typeof actions>;
