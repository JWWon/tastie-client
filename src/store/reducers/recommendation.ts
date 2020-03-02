import {GetRecommendationRes} from '@services/recommendation/recommendation.type';
import {
  CLEAR_RECOMMENDATION,
  GET_RECOMMENDATION,
  GET_RECOMMENDATION_FAILURE,
  GET_RECOMMENDATION_SUCCESS,
  RecommendAction,
} from '@store/actions/recommendation';
import {
  copyPayloadWithLoading,
  setPendingWithLoading,
  setErrorWithLoading,
} from '@utils/helper';
import {AxiosError} from 'axios';
import {createReducer} from 'typesafe-actions';

export interface RecommendationState extends GetRecommendationRes {
  distance: string; // meter
  // OTHER
  loading: boolean;
  error?: AxiosError<any>;
}

const initState: RecommendationState = {
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

const recommendationReducer = createReducer<
  RecommendationState,
  RecommendAction
>(initState, {
  // ASYNC
  [GET_RECOMMENDATION]: setPendingWithLoading,
  [GET_RECOMMENDATION_SUCCESS]: copyPayloadWithLoading,
  [GET_RECOMMENDATION_FAILURE]: setErrorWithLoading,
  // SYNC
  [CLEAR_RECOMMENDATION]: state => ({...state, ...initState}),
});

export default recommendationReducer;
