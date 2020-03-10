import {AxiosResponse} from 'axios';
import _ from 'lodash';
import {takeEvery, put, call, select} from 'redux-saga/effects';

import {RootState} from '@store/reducers';
import * as recommendationsApi from '@services/recommendations';
import * as api from '@services/user';
import {getLikes, setRecommendationData} from '@store/actions/history';

function* getLikesSaga() {
  try {
    const response: AxiosResponse<api.GetLikesRes> = yield call(api.getLikes);
    const likes = response.data;
    yield put(getLikes.success({likes}));
  } catch (e) {
    yield put(getLikes.failure(e));
  }
}

function* setRecommendationDataSaga(
  action: ReturnType<typeof setRecommendationData.request>,
) {
  try {
    const {likes}: RootState['history'] = yield select(
      (state: RootState) => state.history,
    );

    const placeID = action.payload;
    // eslint-disable-next-line prettier/prettier
    const response: AxiosResponse<recommendationsApi.Recommendation> = yield call(
      recommendationsApi.getRecommendation,
      placeID,
    );

    const likeIdx = _.findIndex(likes, item => item.placeID === placeID);
    const data: recommendationsApi.Recommendation = {
      ...response.data,
      positive: likes[likeIdx].positive,
    };

    yield put(setRecommendationData.success(data));
  } catch (e) {
    yield put(setRecommendationData.failure(e));
  }
}

export default function* root() {
  // async
  yield takeEvery(getLikes.request, getLikesSaga);
  yield takeEvery(setRecommendationData.request, setRecommendationDataSaga);
  // sync
}
