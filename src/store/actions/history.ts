import {AxiosError} from 'axios';
import {createAsyncAction, ActionType, createAction} from 'typesafe-actions';

import {Recommendation} from '@services/recommendations';
import {Like, DeleteLike} from '@services/user';
import {ResponseError} from '@services/axios.base';

// GET_LIKES
interface GetLikesRes {
  likes: Like[];
}

export const GET_LIKES = '@history/GET_LIKES_REQUEST';
export const GET_LIKES_SUCCESS = '@history/GET_LIKES_SUCCESS';
export const GET_LIKES_FAILURE = '@history/GET_LIKES_FAILURE';

export const getLikes = createAsyncAction(
  GET_LIKES,
  GET_LIKES_SUCCESS,
  GET_LIKES_FAILURE,
)<undefined, GetLikesRes, AxiosError<ResponseError>>();
// END GET_LIKES

// ADD_EMPTY_RECOMMENDATIONS
export const ADD_EMPTY_RECOMMENDATIONS = '@history/ADD_EMPTY_RECOMMENDATIONS';

export const addEmptyRecommendations = createAction(
  ADD_EMPTY_RECOMMENDATIONS,
)();
// END ADD_EMPTY_RECOMMENDATIONS

// SET_RECOMMENDATION_DATA
export const SET_RECOMMENDATION_DATA =
  '@history/SET_RECOMMENDATION_DATA_REQUEST';
export const SET_RECOMMENDATION_DATA_SUCCESS =
  '@history/SET_RECOMMENDATION_DATA_SUCCESS';
export const SET_RECOMMENDATION_DATA_FAILURE =
  '@history/SET_RECOMMENDATION_DATA_FAILURE';

export const setRecommendationData = createAsyncAction(
  SET_RECOMMENDATION_DATA,
  SET_RECOMMENDATION_DATA_SUCCESS,
  SET_RECOMMENDATION_DATA_FAILURE,
)<string, Recommendation, AxiosError<ResponseError>>();
// END SET_RECOMMENDATION_DATA

// ADD_LIKE
export const ADD_LIKE = '@history/ADD_LIKE';

export const addLike = createAction(ADD_LIKE, (payload: Like) => payload)();
// END ADD_LIKE

// REMOVE_LIKE
export const REMOVE_LIKE = '@history/REMOVE_LIKE';

export const removeLike = createAction(
  REMOVE_LIKE,
  (payload: DeleteLike) => payload,
)();
// END REMOVE_LIKE

const actions = {
  getLikes,
  addEmptyRecommendations,
  setRecommendationData,
  addLike,
  removeLike,
};
export type HistoryActions = ActionType<typeof actions>;
