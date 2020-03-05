import {call, put, select, takeEvery} from 'redux-saga/effects';
import firebase from '@react-native-firebase/app';
import _ from 'lodash';
import {AxiosResponse} from 'axios';

import {
  getRecommendations,
  CLEAR_RECOMMENDATIONS,
} from '@store/actions/recommendations';
import {
  GetRecommendationsReq,
  GetRecommendationsRes,
} from '@services/recommendations';
import {navigate} from '@utils/RootService';
import {updateMessage, showLoading, hideLoading} from '@store/actions/navbar';
import * as api from '@services/recommendations';
import {RootState} from '@store/reducers';
import {SCREEN} from '@utils/consts';

function* getRecommendationsSaga() {
  yield put(showLoading());
  yield navigate(SCREEN.RECOMMENDATIONS);

  try {
    const {
      category,
      situation,
      location: paramLocation,
      hasRequired,
      preference,
    }: RootState['case'] = yield select((state: RootState) => state.case);
    if (!hasRequired) throw new Error('Some required parameters are missing.');

    const payload: GetRecommendationsReq = {
      category,
      situation,
      ..._.pick(paramLocation, ['latitude', 'longitude']),
    };
    const params = {...payload, ...(preference ? {preference} : undefined)};

    const response: AxiosResponse<GetRecommendationsRes> = yield call(
      api.getRecommendations,
      payload,
    );
    if (response.data.length === 0) throw new Error('Recommendation is empty.');

    yield put(getRecommendations.success(response.data));
    yield firebase.analytics().logEvent('search_recommend', params);
  } catch (e) {
    yield put(
      updateMessage({
        message: '미안해옹... 다시 알려줄래옹..?',
        customAction: () => navigate(SCREEN.CASE),
      }),
    );
    yield put(getRecommendations.failure(e));
    yield firebase.analytics().logEvent('search_recommend_failure');
  }
  yield put(hideLoading());
}

function* clearRecommendationsSaga() {
  yield put(updateMessage({message: '다른 음식이 먹고싶나옹?'}));
  yield navigate('Case');
  yield firebase.analytics().logEvent('go_back_to_case_screen');
}

export default function* root() {
  // async
  yield takeEvery(getRecommendations.request, getRecommendationsSaga);
  // sync
  yield takeEvery(CLEAR_RECOMMENDATIONS, clearRecommendationsSaga);
}
