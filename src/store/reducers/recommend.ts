import {GetRecommendRes} from '@services/recommend/recommend.type';
import {
  CLEAR_RECOMMEND,
  GET_RECOMMEND,
  GET_RECOMMEND_FAILURE,
  GET_RECOMMEND_SUCCESS,
  RecommendAction,
} from '@store/actions/recommend';
import {
  copyPayloadWithLoading,
  setPendingWithLoading,
  setErrorWithLoading,
} from '@utils/helper';
import {AxiosError} from 'axios';
import {createReducer} from 'typesafe-actions';

export interface RecommendState extends GetRecommendRes {
  distance: string; // meter
  // OTHER
  loading: boolean;
  error?: AxiosError<any>;
}

const initState: RecommendState = {
  id: '',
  name: '',
  rating: -1,
  userRatingsTotal: -1,
  priceLevel: -1,
  types: [],
  distance: '',
  location: {latitude: 0, longitude: 0},
  formattedAddress: '',
  formattedPhoneNumber: '',
  website: '',
  photoUrls: [],
  openingHours: {
    openNow: false,
    weekdayText: [],
  },
  // OTHER
  loading: false,
};

const recommendReducer = createReducer<RecommendState, RecommendAction>(
  initState,
  {
    // ASYNC
    [GET_RECOMMEND]: setPendingWithLoading,
    [GET_RECOMMEND_SUCCESS]: copyPayloadWithLoading,
    [GET_RECOMMEND_FAILURE]: setErrorWithLoading,
    // SYNC
    [CLEAR_RECOMMEND]: () => initState,
  },
);

export default recommendReducer;
