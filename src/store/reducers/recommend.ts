import {createReducer} from 'typesafe-actions';

import {
  RecommendAction,
  GET_RECOMMEND_SUCCESS,
  GET_RECOMMEND_FAILURE,
  CLEAR_RECOMMEND,
} from '@store/actions/recommend';
import {GetRecommendRes} from '@services/recommend/recommend.type';
import {copyPayload, setError} from '@utils/helper';

type RecommendState = GetRecommendRes;

const initState: RecommendState = {
  id: '',
  name: '',
  rating: -1,
  userRatingsTotal: -1,
  priceLevel: -1,
  types: [],
  location: {
    latitude: 0,
    longitude: 0,
  },
  formattedAddress: '',
  formattedPhoneNumber: '',
  website: '',
  photoUrls: [],
  openingHours: {
    openNow: false,
    weekdayText: [],
  },
};

const recommendReducer = createReducer<RecommendState, RecommendAction>(
  initState,
  {
    // ASYNC
    [GET_RECOMMEND_SUCCESS]: copyPayload,
    [GET_RECOMMEND_FAILURE]: setError,
    // SYNC
    [CLEAR_RECOMMEND]: state => ({...state, ...initState}),
  },
);

export default recommendReducer;
