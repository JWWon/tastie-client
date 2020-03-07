import {call, put, select, takeEvery} from 'redux-saga/effects';
import produce from 'immer';
import firebase from '@react-native-firebase/app';
import _ from 'lodash';
import {AxiosResponse} from 'axios';

import {
  getRecommendations,
  createLike,
  deleteLike,
} from '@store/actions/recommendations';
import {navigate} from '@utils/RootService';
import {updateMessage, showLoading, hideLoading} from '@store/actions/navbar';
import {
  GetRecommendationsReq,
  GetRecommendationsRes,
} from '@services/recommendations';
import * as api from '@services/recommendations';
import * as userApi from '@services/user';
import {RootState} from '@store/reducers';
import {SCREEN, EVENT} from '@utils/consts';
import {getDistance} from '@utils/helper';
import {GetLikesRes} from '@services/user';

// HELPERS
function* mapAdditionalInfos(data: GetRecommendationsRes) {
  const auth: RootState['auth'] = yield select(
    (state: RootState) => state.auth,
  );

  const {data: likes}: AxiosResponse<GetLikesRes> = yield call(
    userApi.getLikes,
  );
  const nextData = data.map(item =>
    produce(item, draft => {
      const idx = _.findIndex(likes, like => like.placeID === item.id);
      draft.distance = getDistance(auth.userCoords, item.location);
      if (idx !== -1) draft.positive = likes[idx].positive;
    }),
  );
  return nextData;
}

// SAGAS
function* getRecommendationsSaga() {
  yield put(showLoading());
  yield navigate(SCREEN.RECOMMENDATIONS);

  try {
    const {
      category,
      situation,
      location,
      hasRequired,
      preference,
    }: RootState['case'] = yield select((state: RootState) => state.case);

    if (!hasRequired) throw new Error('Some required parameters are missing.');

    const payload: GetRecommendationsReq = {
      category,
      situation,
      ..._.pick(location, ['latitude', 'longitude']),
    };
    const params = {...payload, ...(preference ? {preference} : undefined)};

    const {data}: AxiosResponse<GetRecommendationsRes> = yield call(
      api.getRecommendations,
      payload,
    );
    if (data.length === 0) throw new Error('Recommendation is empty.');

    const recommendations: GetRecommendationsRes = yield call(
      mapAdditionalInfos,
      data,
    );
    yield put(getRecommendations.success(recommendations));
    yield firebase.analytics().logEvent(EVENT.SEARCH_RECOMMEND, params);
  } catch (e) {
    yield put(
      updateMessage({
        message: '미안해옹... 다시 알려줄래옹..?',
        customAction: () => navigate(SCREEN.CASE),
      }),
    );
    yield put(getRecommendations.failure(e));
    yield firebase.analytics().logEvent(EVENT.SEARCH_RECOMMEND_FAILURE);
  }
  yield put(hideLoading());
}

function* createLikeSaga(action: ReturnType<typeof createLike.request>) {
  try {
    const {positive} = action.payload;
    const {selectedID}: RootState['recommendations'] = yield select(
      (state: RootState) => state.recommendations,
    );
    if (!selectedID) throw new Error('There is no selected recommendation');

    yield call(userApi.createLike, {placeID: selectedID, positive});
    yield put(createLike.success({positive}));
    yield firebase.analytics().logEvent(EVENT.PRESS_LIKE, {positive});
  } catch (e) {
    yield put(createLike.failure(e));
  }
}

function* deleteLikeSaga(action: ReturnType<typeof deleteLike.request>) {
  try {
    yield call(userApi.deleteLike, action.payload);
    yield put(deleteLike.success(action.payload));
    yield firebase.analytics().logEvent(EVENT.RECALL_LIKE);
  } catch (e) {
    yield put(deleteLike.failure(e));
  }
}

export default function* root() {
  // async
  yield takeEvery(getRecommendations.request, getRecommendationsSaga);
  yield takeEvery(createLike.request, createLikeSaga);
  yield takeEvery(deleteLike.request, deleteLikeSaga);
}
