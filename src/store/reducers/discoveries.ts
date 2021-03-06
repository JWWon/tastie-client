import produce from 'immer';
import _ from 'lodash';

import {GetDiscoveriesRes} from '@services/discoveries';
import {
  DiscoveriesAction,
  GET_DISCOVERIES,
  GET_DISCOVERYIES_FAILURE,
  GET_DISCOVERIES_SUCCESS,
  CREATE_LIKE_SUCCESS,
  SHOW_LIKES_MODAL,
  HIDE_LIKES_MODAL,
  CREATE_LIKE_FAILURE,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_FAILURE,
  UPDATE_MAX_SWIPED_INDEX,
  CLEAR_DISCOVERIES_SUCCESS,
} from '@store/actions/discoveries';
import {setErrorWithLoading, setError} from '@utils/helper';
import {AxiosError} from 'axios';
import {createReducer} from 'typesafe-actions';

interface DiscoveriesState {
  data: GetDiscoveriesRes;
  // OTHER
  loading: boolean;
  maxSwipedIndex: number; // for firebase-analytics
  selectedID?: string;
  onSelectPositive?: (positive: boolean) => void;
  error?: AxiosError;
}

const initState: DiscoveriesState = {
  data: [],
  // OTHER
  loading: true,
  maxSwipedIndex: 0,
};

const discoveriesReducer = createReducer<DiscoveriesState, DiscoveriesAction>(
  initState,
  {
    // ASYNC
    [GET_DISCOVERIES]: state => ({
      ...state,
      data: [],
      loading: true,
      error: undefined,
    }),
    [GET_DISCOVERIES_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
      loading: false,
    }),
    [GET_DISCOVERYIES_FAILURE]: setErrorWithLoading,
    [CREATE_LIKE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const idx = _.findIndex(
          state.data,
          item => item.id === state.selectedID,
        );
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
    [CLEAR_DISCOVERIES_SUCCESS]: () => initState,
    // SYNC
    [SHOW_LIKES_MODAL]: (state, action) => ({...state, ...action.payload}),
    [HIDE_LIKES_MODAL]: state =>
      produce(state, draft => {
        delete draft.selectedID;
        delete draft.onSelectPositive;
      }),
    [UPDATE_MAX_SWIPED_INDEX]: (state, action) => ({
      ...state,
      maxSwipedIndex: Math.max(action.payload, state.maxSwipedIndex),
    }),
  },
);

export default discoveriesReducer;
