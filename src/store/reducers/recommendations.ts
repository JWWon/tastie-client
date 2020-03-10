import produce from 'immer';
import _ from 'lodash';

import {GetRecommendationsRes} from '@services/recommendations';
import {
  RecommendationsAction,
  GET_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_FAILURE,
  GET_RECOMMENDATIONS_SUCCESS,
  CREATE_LIKE_SUCCESS,
  SHOW_LIKES_MODAL,
  HIDE_LIKES_MODAL,
  CREATE_LIKE_FAILURE,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_FAILURE,
  CHECK_MAX_SWIPED_INDEX,
  CLEAR_RECOMMENDATIONS_SUCCESS,
} from '@store/actions/recommendations';
import {
  setPendingWithLoading,
  setErrorWithLoading,
  setError,
} from '@utils/helper';
import {AxiosError} from 'axios';
import {createReducer} from 'typesafe-actions';

export interface RecommendationsState {
  data: GetRecommendationsRes;
  // OTHER
  loading: boolean;
  maxSwipedIndex: number; // for firebase-analytics
  selectedID?: string;
  onSelectPositive?: (positive: boolean) => void;
  error?: AxiosError<any>;
}

const initState: RecommendationsState = {
  data: [],
  // OTHER
  loading: true,
  maxSwipedIndex: 0,
};

const recommendationReducer = createReducer<
  RecommendationsState,
  RecommendationsAction
>(initState, {
  // ASYNC
  [GET_RECOMMENDATIONS]: setPendingWithLoading,
  [GET_RECOMMENDATIONS_SUCCESS]: (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
  }),
  [GET_RECOMMENDATIONS_FAILURE]: setErrorWithLoading,
  [CREATE_LIKE_SUCCESS]: (state, action) =>
    produce(state, draft => {
      const idx = _.findIndex(state.data, item => item.id === state.selectedID);
      if (idx > -1) draft.data[idx].positive = action.payload.positive;
      delete draft.selectedID;
    }),
  [CREATE_LIKE_FAILURE]: setError,
  [DELETE_LIKE_SUCCESS]: (state, action) =>
    produce(state, draft => {
      const idx = _.findIndex(
        state.data,
        item => item.id === action.payload.placeID,
      );
      if (idx > -1) delete draft.data[idx].positive;
    }),
  [DELETE_LIKE_FAILURE]: setError,
  [CLEAR_RECOMMENDATIONS_SUCCESS]: () => initState,
  // SYNC
  [SHOW_LIKES_MODAL]: (state, action) => ({...state, ...action.payload}),
  [HIDE_LIKES_MODAL]: state =>
    produce(state, draft => {
      delete draft.selectedID;
      delete draft.onSelectPositive;
    }),
  [CHECK_MAX_SWIPED_INDEX]: (state, action) => ({
    ...state,
    maxSwipedIndex: Math.max(action.payload, state.maxSwipedIndex),
  }),
});

export default recommendationReducer;
