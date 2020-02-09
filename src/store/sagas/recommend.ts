import {call, put, select, takeEvery} from 'redux-saga/effects';
import _ from 'lodash';
import {AxiosResponse} from 'axios';

import {getRecommend, CLEAR_RECOMMEND} from '@store/actions/recommend';
import {updateLoading, updateContent} from '@store/actions/message';
import {
  GetRecommendReq,
  GetRecommendRes,
} from '@services/recommend/recommend.type';
import * as api from '@services/recommend';
import {RootState} from '@store/reducers';

function* getRecommendSaga() {
  yield put(updateLoading({loading: true}));
  try {
    const {
      category,
      situation,
      location,
      hasRequired,
    }: RootState['case'] = yield select((state: RootState) => state.case);

    if (!hasRequired) {
      throw new Error('Please enter all required parameters');
    }

    const payload: GetRecommendReq = {
      category,
      situation,
      ..._.pick(location, ['latitude', 'longitude']),
    };
    const response: AxiosResponse<GetRecommendRes> = yield call(
      api.getRecommend,
      payload,
    );
    yield put(getRecommend.success(response.data));
  } catch (e) {
    yield put(updateContent({content: '추천 음식을 불러오는데 실패했어옹…'}));
    yield put(getRecommend.failure(e));
  }
  yield put(updateLoading({loading: false}));
}

function* clearRecommendSaga() {}

export default function* root() {
  // async
  yield takeEvery(getRecommend.request, getRecommendSaga);
  // sync
  yield takeEvery(CLEAR_RECOMMEND, clearRecommendSaga);
}
