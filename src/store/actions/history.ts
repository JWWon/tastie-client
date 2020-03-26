import {AxiosError} from 'axios';
import {createAsyncAction, ActionType, createAction} from 'typesafe-actions';

import {DiscoveryDetail} from '@services/discoveries';
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

// ADD_EMPTY_DISCOVERYIES
export const ADD_EMPTY_DISCOVERYIES = '@history/ADD_EMPTY_DISCOVERYIES';

export const addEmptyDiscoveries = createAction(ADD_EMPTY_DISCOVERYIES)();
// END ADD_EMPTY_DISCOVERYIES

// SET_DISCOVERY_CARD_DATA
export const SET_DISCOVERY_CARD_DATA =
  '@history/SET_DISCOVERY_CARD_DATA_REQUEST';
export const SET_DISCOVERY_CARD_DATA_SUCCESS =
  '@history/SET_DISCOVERY_CARD_DATA_SUCCESS';
export const SET_DISCOVERY_CARD_DATA_FAILURE =
  '@history/SET_DISCOVERY_CARD_DATA_FAILURE';

export const setDiscoveryCardData = createAsyncAction(
  SET_DISCOVERY_CARD_DATA,
  SET_DISCOVERY_CARD_DATA_SUCCESS,
  SET_DISCOVERY_CARD_DATA_FAILURE,
)<string, DiscoveryDetail, AxiosError<ResponseError>>();
// END SET_DISCOVERY_CARD_DATA

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
  addEmptyDiscoveries,
  setDiscoveryCardData,
  addLike,
  removeLike,
};
export type HistoryActions = ActionType<typeof actions>;
