import {call, put, select, takeEvery} from 'redux-saga/effects';
import firebase from '@react-native-firebase/app';
import _ from 'lodash';
import {AxiosResponse} from 'axios';

import {
  getRecommendation,
  clearRecommendation,
  CLEAR_RECOMMENDATION,
} from '@store/actions/recommendation';
import {
  GetRecommendationReq,
  GetRecommendationRes,
} from '@services/recommendation/recommendation.type';
import {updateMessage, showLoading, hideLoading} from '@store/actions/navbar';
import * as api from '@services/recommendation';
import {RootState} from '@store/reducers';
import {getDistance} from '@utils/helper';
import {SCREEN} from '@utils/consts';

function* getRecommendSaga(
  action: ReturnType<typeof getRecommendation.request>,
) {
  const {navigate} = action.payload;
  yield put(showLoading());
  yield navigate(SCREEN.RECOMMENDATION);

  try {
    const {
      userCoords,
      category,
      situation,
      location: paramLocation,
      hasRequired,
      preference,
    }: RootState['case'] = yield select((state: RootState) => state.case);

    if (!hasRequired) {
      throw new Error('Some required parameters are not exist');
    }

    const payload: GetRecommendationReq = {
      category,
      situation,
      ..._.pick(paramLocation, ['latitude', 'longitude']),
    };
    const params = {...payload, ...(preference ? {preference} : undefined)};

    const response: AxiosResponse<GetRecommendationRes> = yield call(
      api.getRecommendation,
      payload,
    );
    const recommend = {
      ...response.data,
      distance: getDistance(userCoords, response.data.location),
    };
    yield put(getRecommendation.success(recommend));
    yield firebase.analytics().logEvent('search_recommend', params);
  } catch (e) {
    yield put(
      updateMessage({
        message: '미안해옹... 다시 알려줄래옹..?',
        customAction: () => navigate('Case'),
      }),
    );
    yield put(getRecommendation.failure(e));
    yield firebase.analytics().logEvent('search_recommend_failure');
  }
  yield put(hideLoading());
}

function* clearRecommendSaga(action: ReturnType<typeof clearRecommendation>) {
  const {navigate} = action.payload;

  yield put(updateMessage({message: '다른 음식이 먹고싶나옹?'}));
  yield navigate('Case');
  yield firebase.analytics().logEvent('go_back_to_case_screen');
}

export default function* root() {
  // async
  yield takeEvery(getRecommendation.request, getRecommendSaga);
  // sync
  yield takeEvery(CLEAR_RECOMMENDATION, clearRecommendSaga);
}
