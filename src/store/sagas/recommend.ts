import {call, put, select, takeEvery} from 'redux-saga/effects';
import firebase from '@react-native-firebase/app';
import _ from 'lodash';
import {AxiosResponse} from 'axios';

import {
  getRecommend,
  clearRecommend,
  CLEAR_RECOMMEND,
} from '@store/actions/recommend';
import {updateLoading, updateContent} from '@store/actions/message';
import {
  GetRecommendReq,
  GetRecommendRes,
} from '@services/recommend/recommend.type';
import * as api from '@services/recommend';
import {RootState} from '@store/reducers';
import {getDistance} from '@utils/helper';

function* getRecommendSaga(action: ReturnType<typeof getRecommend.request>) {
  const {navigate} = action.payload;
  yield put(updateLoading({loading: true}));
  yield navigate('Recommend');

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

    const payload: GetRecommendReq = {
      category,
      situation,
      ..._.pick(paramLocation, ['latitude', 'longitude']),
    };
    const params = {...payload, ...(preference ? {preference} : undefined)};
    yield firebase.analytics().logEvent('search_recommend', params);

    const response: AxiosResponse<GetRecommendRes> = yield call(
      api.getRecommend,
      payload,
    );
    const recommend = {
      ...response.data,
      distance: getDistance(userCoords, response.data.location),
    };
    const logRecommend = _.pick(recommend, [
      'name',
      'rating',
      'distance',
      'userRatingsTotal',
      'priceLevel',
      'formattedAddress',
    ]);
    yield firebase.analytics().logEvent('get_recommend', logRecommend);
    yield put(getRecommend.success(recommend));
  } catch (e) {
    yield put(
      updateContent({
        content: '미안해옹... 다시 알려줄래옹..?',
        onPress: () => navigate('Case'),
      }),
    );
    yield put(getRecommend.failure(e));
  }
  yield put(updateLoading({loading: false}));
}

function* clearRecommendSaga(action: ReturnType<typeof clearRecommend>) {
  const {navigate} = action.payload;

  yield put(updateContent({content: '다른 음식이 먹고싶나옹?'}));
  yield navigate('Case');
  yield firebase.analytics().logEvent('go_back_to_case_screen');
}

export default function* root() {
  // async
  yield takeEvery(getRecommend.request, getRecommendSaga);
  // sync
  yield takeEvery(CLEAR_RECOMMEND, clearRecommendSaga);
}
