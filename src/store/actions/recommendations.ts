import {ActionType, createAsyncAction, createAction} from 'typesafe-actions';
import {AxiosError} from 'axios';

import {ResponseError} from '@services/axios.base';
import {GetRecommendationsRes} from '@services/recommendations';
import {DeleteLike, Like} from '@services/user';

// GET_RECOMMENDATIONS
export const GET_RECOMMENDATIONS =
  '@recommendations/GET_RECOMMENDATIONS_REQUEST';
export const GET_RECOMMENDATIONS_SUCCESS =
  '@recommendations/GET_RECOMMENDATIONS_SUCCESS';
export const GET_RECOMMENDATIONS_FAILURE =
  '@recommendations/GET_RECOMMENDATIONS_FAILURE';

export const getRecommendations = createAsyncAction(
  GET_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_SUCCESS,
  GET_RECOMMENDATIONS_FAILURE,
)<undefined, GetRecommendationsRes, AxiosError<ResponseError>>();
// END GET_RECOMMENDATIONS

// CLEAR_RECOMMENDATIONS
export const CLEAR_RECOMMENDATIONS =
  '@recommendations/CLEAR_RECOMMENDATIONS_REQUEST';
export const CLEAR_RECOMMENDATIONS_SUCCESS =
  '@recommendations/CLEAR_RECOMMENDATIONS_SUCCESS';

export const clearRecommendations = createAsyncAction(
  CLEAR_RECOMMENDATIONS,
  CLEAR_RECOMMENDATIONS_SUCCESS,
  'DUMMY',
)<undefined, undefined, undefined>();
// END CLEAR_RECOMMENDATIONS

// SHOW_LIKES_MODAL
interface ShowLikesModal {
  selectedID: string;
  onSelectPositive?: (positive: boolean) => void; // For local state
}

export const SHOW_LIKES_MODAL = '@recommendations/SHOW_LIKES_MODAL';

export const showLikesModal = createAction(
  SHOW_LIKES_MODAL,
  (payload: ShowLikesModal) => payload,
)();
// END SHOW_LIKES_MODAL

// HIDE_LIKES_MODAL
export const HIDE_LIKES_MODAL = '@recommendations/HIDE_LIKES_MODAL';

export const hideLikesModal = createAction(HIDE_LIKES_MODAL)();
// END HIDE_LIKES_MODAL

// CREATE_LIKE
type CreateLike = Pick<Like, 'positive'>;

export const CREATE_LIKE = '@recommendations/CREATE_LIKE_REQUEST';
export const CREATE_LIKE_SUCCESS = '@recommendations/CREATE_LIKE_SUCCESS';
export const CREATE_LIKE_FAILURE = '@recommendations/CREATE_LIKE_FAILURE';

export const createLike = createAsyncAction(
  CREATE_LIKE,
  CREATE_LIKE_SUCCESS,
  CREATE_LIKE_FAILURE,
)<CreateLike, CreateLike, AxiosError<ResponseError>>();
// END CREATE_LIKE

// DELETE_LIKE
export const DELETE_LIKE = '@recommendations/DELETE_LIKE_REQUEST';
export const DELETE_LIKE_SUCCESS = '@recommendations/DELETE_LIKE_SUCCESS';
export const DELETE_LIKE_FAILURE = '@recommendations/DELETE_LIKE_FAILURE';

export const deleteLike = createAsyncAction(
  DELETE_LIKE,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_FAILURE,
)<DeleteLike, DeleteLike, AxiosError<ResponseError>>();
// END DELETE_LIKE

// CHECK_MAX_SWIPED_INDEX
export const CHECK_MAX_SWIPED_INDEX = '@recommendations/CHECK_MAX_SWIPED_INDEX';

export const checkMaxSwipedIndex = createAction(
  CHECK_MAX_SWIPED_INDEX,
  (payload: number) => payload,
)();
// END CHECK_MAX_SWIPED_INDEX

const actions = {
  getRecommendations,
  clearRecommendations,
  showLikesModal,
  hideLikesModal,
  createLike,
  deleteLike,
  updateMaxSwipedIndex: checkMaxSwipedIndex,
};
export type RecommendationsAction = ActionType<typeof actions>;
