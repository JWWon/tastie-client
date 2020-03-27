import {AxiosResponse} from 'axios';
import _ from 'lodash';
import {takeEvery, put, call, select} from 'redux-saga/effects';

import {RootState} from '@store/reducers';
import * as discoveriesApi from '@services/discoveries';
import * as api from '@services/user';
import {getLikes, setDiscoveryCardData} from '@store/actions/history';

function* getLikesSaga() {
  try {
    const response: AxiosResponse<api.GetLikesRes> = yield call(api.getLikes);
    const likes = response.data;
    yield put(getLikes.success({likes}));
  } catch (e) {
    yield put(getLikes.failure(e));
  }
}

function* setDiscoveryDataSaga(
  action: ReturnType<typeof setDiscoveryCardData.request>,
) {
  try {
    const {likes}: RootState['history'] = yield select(
      (state: RootState) => state.history,
    );

    const placeID = action.payload;
    // eslint-disable-next-line prettier/prettier
    const response: AxiosResponse<discoveriesApi.DiscoveryDetail> = yield call(
      discoveriesApi.getDiscovery,
      placeID,
    );

    const likeIdx = _.findIndex(likes, item => item.placeID === placeID);
    const data: discoveriesApi.DiscoveryDetail = {
      ...response.data,
      positive: likes[likeIdx].positive,
    };

    yield put(setDiscoveryCardData.success(data));
  } catch (e) {
    yield put(setDiscoveryCardData.failure(e));
  }
}

export default function* root() {
  // async
  yield takeEvery(getLikes.request, getLikesSaga);
  yield takeEvery(setDiscoveryCardData.request, setDiscoveryDataSaga);
  // sync
}
