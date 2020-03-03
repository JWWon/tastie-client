import {ActionType, createAsyncAction, createAction} from 'typesafe-actions';
import {AxiosError} from 'axios';

import {ResponseError} from '@services/axios.base';
import {GetRecommendationsRes} from '@services/recommendations';

// GET_RECOMMENDATIONS
export const GET_RECOMMENDATIONS = '@recommend/GET_RECOMMENDATIONS_REQUEST';
export const GET_RECOMMENDATIONS_SUCCESS =
  '@recommend/GET_RECOMMENDATIONS_SUCCESS';
export const GET_RECOMMENDATIONS_FAILURE =
  '@recommend/GET_RECOMMENDATIONS_FAILURE';

export const getRecommendations = createAsyncAction(
  GET_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_SUCCESS,
  GET_RECOMMENDATIONS_FAILURE,
)<undefined, GetRecommendationsRes, AxiosError<ResponseError>>();
// END GET_RECOMMENDATIONS

// CLEAR_RECOMMENDATIONS
export const CLEAR_RECOMMENDATIONS = '@recommend/CLEAR_RECOMMENDATIONS';

export const clearRecommendations = createAction(CLEAR_RECOMMENDATIONS)();
// END CLEAR_RECOMMENDATIONS

const actions = {getRecommendations, clearRecommendations};
export type RecommendationsAction = ActionType<typeof actions>;
