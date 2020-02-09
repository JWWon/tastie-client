import {ActionType, createAsyncAction, createAction} from 'typesafe-actions';
import {AxiosError} from 'axios';

import {GetRecommendRes} from '@services/recommend/recommend.type';

// GET_RECOMMEND
export const GET_RECOMMEND = '@recommend/GET_RECOMMEND_REQUEST';
export const GET_RECOMMEND_SUCCESS = '@recommend/GET_RECOMMEND_SUCCESS';
export const GET_RECOMMEND_FAILURE = '@recommend/GET_RECOMMEND_FAILURE';

export const getRecommend = createAsyncAction(
  GET_RECOMMEND,
  GET_RECOMMEND_SUCCESS,
  GET_RECOMMEND_FAILURE,
)<undefined, GetRecommendRes, AxiosError>();
// END GET_RECOMMEND

// CLEAR_RECOMMEND
export const CLEAR_RECOMMEND = '@recommend/CLEAR_RECOMMEND';

export const clearRecommend = createAction(CLEAR_RECOMMEND, () => {})();
// END CLEAR_RECOMMEND

const actions = {getRecommend, clearRecommend};
export type RecommendAction = ActionType<typeof actions>;
