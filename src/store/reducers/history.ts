import {createReducer} from 'typesafe-actions';
import _ from 'lodash';
import produce from 'immer';

import {Like} from '@services/user';
import {DiscoveryDetail} from '@services/discoveries';
import {
  HistoryActions,
  GET_LIKES,
  GET_LIKES_SUCCESS,
  GET_LIKES_FAILURE,
  SET_DISCOVERY_CARD_DATA_FAILURE,
  SET_DISCOVERY_CARD_DATA_SUCCESS,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_EMPTY_DISCOVERYIES,
} from '@store/actions/history';
import {
  setPendingWithLoading,
  setErrorWithLoading,
  setError,
} from '@utils/helper';

type PlaceID = string;
export interface HistoryState {
  likes: Like[];
  discoveries: (DiscoveryDetail | PlaceID)[];
  // OTHER
  loading: boolean;
}

const initState: HistoryState = {
  likes: [],
  discoveries: [],
  // OTHER
  loading: true,
};

const getPlaceIds = (likes: Like[], index?: number) =>
  likes.slice(index || 0, 6).map(item => item.placeID);

const historyReducer = createReducer<HistoryState, HistoryActions>(initState, {
  // ASYNC
  [GET_LIKES]: setPendingWithLoading,
  [GET_LIKES_SUCCESS]: (state, action) =>
    produce(state, draft => {
      draft.likes = action.payload.likes;
      draft.discoveries = getPlaceIds(draft.likes);
    }),
  [GET_LIKES_FAILURE]: setErrorWithLoading,
  [SET_DISCOVERY_CARD_DATA_SUCCESS]: (state, action) =>
    produce(state, draft => {
      const discovery = action.payload;
      const idx = _.findIndex(state.discoveries, item => item === discovery.id);
      // override
      draft.discoveries[idx] = discovery;
    }),
  [SET_DISCOVERY_CARD_DATA_FAILURE]: setError,
  // SYNC
  [ADD_LIKE]: (state, action) =>
    produce(state, draft => {
      const like = action.payload;
      const idx = _.findIndex(
        state.likes,
        item => item.placeID === like.placeID,
      );
      if (idx === -1) draft.likes = [like, ...draft.likes];
      else draft.likes[idx] = like;
      // TODO: Optimizing remove item from discoveries
      draft.discoveries = getPlaceIds(draft.likes);
    }),
  [REMOVE_LIKE]: (state, action) =>
    produce(state, draft => {
      const like = action.payload;
      const idx = _.findIndex(
        state.likes,
        item => item.placeID === like.placeID,
      );
      draft.likes.splice(idx, 1); // remove like
      // TODO: Optimizing remove item from discoveries
      draft.discoveries = getPlaceIds(draft.likes);
    }),
  [ADD_EMPTY_DISCOVERYIES]: state =>
    produce(state, draft => {
      const startIdx = state.discoveries.length;
      const maxIdx = state.likes.length;
      if (startIdx < state.likes.length) {
        const initList = state.likes
          .slice(startIdx, Math.max(startIdx + 6, maxIdx))
          .map(item => item.placeID);
        draft.discoveries.push(...initList);
      }
    }),
});

export default historyReducer;
