import {GetRecommendationsRes} from '@services/recommendations';
import {
  CLEAR_RECOMMENDATIONS,
  GET_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_FAILURE,
  GET_RECOMMENDATIONS_SUCCESS,
  RecommendationsAction,
} from '@store/actions/recommendations';
import {setPendingWithLoading, setErrorWithLoading} from '@utils/helper';
import {AxiosError} from 'axios';
import {createReducer} from 'typesafe-actions';

export interface RecommendationsState {
  data: GetRecommendationsRes;
  // OTHER
  loading: boolean;
  error?: AxiosError<any>;
}

const initState: RecommendationsState = {
  data: [],
  // OTHER
  loading: false,
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
  // SYNC
  [CLEAR_RECOMMENDATIONS]: () => initState,
});

export default recommendationReducer;
