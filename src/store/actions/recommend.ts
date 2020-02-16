import {ActionType, createAsyncAction, createAction} from 'typesafe-actions';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AxiosError} from 'axios';

import {HomeParamList} from '@navigations/Home';
import {RecommendState} from '@store/reducers/recommend';

// GET_RECOMMEND
export const GET_RECOMMEND = '@recommend/GET_RECOMMEND_REQUEST';
export const GET_RECOMMEND_SUCCESS = '@recommend/GET_RECOMMEND_SUCCESS';
export const GET_RECOMMEND_FAILURE = '@recommend/GET_RECOMMEND_FAILURE';

export const getRecommend = createAsyncAction(
  GET_RECOMMEND,
  GET_RECOMMEND_SUCCESS,
  GET_RECOMMEND_FAILURE,
)<
  BottomTabNavigationProp<HomeParamList, 'Case'>,
  Omit<RecommendState, 'loading'>,
  AxiosError
>();
// END GET_RECOMMEND

// CLEAR_RECOMMEND
export const CLEAR_RECOMMEND = '@recommend/CLEAR_RECOMMEND';

export const clearRecommend = createAction(
  CLEAR_RECOMMEND,
  (payload: BottomTabNavigationProp<HomeParamList, 'Recommend'>) => payload,
)();
// END CLEAR_RECOMMEND

const actions = {getRecommend, clearRecommend};
export type RecommendAction = ActionType<typeof actions>;
