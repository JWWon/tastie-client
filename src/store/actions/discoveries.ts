import {ActionType, createAsyncAction, createAction} from 'typesafe-actions';
import {AxiosError} from 'axios';

import {ResponseError} from '@services/axios.base';
import {GetDiscoveriesRes} from '@services/discoveries';
import {DeleteLike, Like} from '@services/user';

// GET_DISCOVERIES
export const GET_DISCOVERIES = '@discoveries/GET_DISCOVERIES_REQUEST';
export const GET_DISCOVERIES_SUCCESS = '@discoveries/GET_DISCOVERIES_SUCCESS';
export const GET_DISCOVERYIES_FAILURE = '@discoveries/GET_DISCOVERIES_FAILURE';

export const getDiscoveries = createAsyncAction(
  GET_DISCOVERIES,
  GET_DISCOVERIES_SUCCESS,
  GET_DISCOVERYIES_FAILURE,
)<undefined, GetDiscoveriesRes, AxiosError<ResponseError>>();
// END GET_DISCOVERIES

// CLEAR_DISCOVERIES
export const CLEAR_DISCOVERIES = '@discoveries/CLEAR_DISCOVERIES_REQUEST';
export const CLEAR_DISCOVERIES_SUCCESS =
  '@discoveries/CLEAR_DISCOVERIES_SUCCESS';

export const clearDiscoveries = createAsyncAction(
  CLEAR_DISCOVERIES,
  CLEAR_DISCOVERIES_SUCCESS,
  'DUMMY',
)<undefined, undefined, undefined>();
// END CLEAR_DISCOVERIES

// SHOW_LIKES_MODAL
interface ShowLikesModal {
  selectedID: string;
  onSelectPositive?: (positive: boolean) => void; // For local state
}

export const SHOW_LIKES_MODAL = '@discoveries/SHOW_LIKES_MODAL';

export const showLikesModal = createAction(
  SHOW_LIKES_MODAL,
  (payload: ShowLikesModal) => payload,
)();
// END SHOW_LIKES_MODAL

// HIDE_LIKES_MODAL
export const HIDE_LIKES_MODAL = '@discoveries/HIDE_LIKES_MODAL';

export const hideLikesModal = createAction(HIDE_LIKES_MODAL)();
// END HIDE_LIKES_MODAL

// CREATE_LIKE
type CreateLike = Pick<Like, 'positive'>;

export const CREATE_LIKE = '@discoveries/CREATE_LIKE_REQUEST';
export const CREATE_LIKE_SUCCESS = '@discoveries/CREATE_LIKE_SUCCESS';
export const CREATE_LIKE_FAILURE = '@discoveries/CREATE_LIKE_FAILURE';

export const createLike = createAsyncAction(
  CREATE_LIKE,
  CREATE_LIKE_SUCCESS,
  CREATE_LIKE_FAILURE,
)<CreateLike, CreateLike, AxiosError<ResponseError>>();
// END CREATE_LIKE

// DELETE_LIKE
export const DELETE_LIKE = '@discoveries/DELETE_LIKE_REQUEST';
export const DELETE_LIKE_SUCCESS = '@discoveries/DELETE_LIKE_SUCCESS';
export const DELETE_LIKE_FAILURE = '@discoveries/DELETE_LIKE_FAILURE';

export const deleteLike = createAsyncAction(
  DELETE_LIKE,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_FAILURE,
)<DeleteLike, DeleteLike, AxiosError<ResponseError>>();
// END DELETE_LIKE

// CHECK_MAX_SWIPED_INDEX
export const UPDATE_MAX_SWIPED_INDEX = '@discoveries/UPDATE_MAX_SWIPED_INDEX';

export const updateMaxSwipedIndex = createAction(
  UPDATE_MAX_SWIPED_INDEX,
  (payload: number) => payload,
)();
// END CHECK_MAX_SWIPED_INDEX

const actions = {
  getDiscoveries,
  clearDiscoveries,
  showLikesModal,
  hideLikesModal,
  createLike,
  deleteLike,
  updateMaxSwipedIndex,
};
export type DiscoveriesAction = ActionType<typeof actions>;
