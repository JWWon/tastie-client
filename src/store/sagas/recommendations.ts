import {call, put, delay, select, takeEvery} from 'redux-saga/effects';
import produce from 'immer';
import moment from 'moment';
import firebase from '@react-native-firebase/app';
import _ from 'lodash';
import {AxiosResponse} from 'axios';

import {
  getRecommendations,
  createLike,
  deleteLike,
  clearRecommendations,
} from '@store/actions/recommendations';
import {addLike, removeLike} from '@store/actions/history';
import {updateMessage, showLoading, hideLoading} from '@store/actions/navbar';
import {navigate} from '@utils/RootService';
import {
  GetRecommendationsReq,
  GetRecommendationsRes,
} from '@services/recommendations';
import * as api from '@services/recommendations';
import * as userApi from '@services/user';
import {RootState} from '@store/reducers';
import {SCREEN, EVENT, MESSAGE} from '@utils/consts';
import {getDistance} from '@utils/helper';

// HELPERS
function* mapAdditionalInfos(data: GetRecommendationsRes) {
  const {userCoords}: RootState['auth'] = yield select(
    (state: RootState) => state.auth,
  );
  const {likes}: RootState['history'] = yield select(
    (state: RootState) => state.history,
  );

  const nextData = data.map(item =>
    produce(item, draft => {
      // map distance
      draft.distance = getDistance(userCoords, item.location);
      // map positive
      const idx = _.findIndex(likes, like => like.placeID === item.id);
      if (idx !== -1) draft.positive = likes[idx].positive;
    }),
  );
  return nextData;
}

// SAGAS
function* getRecommendationsSaga() {
  yield put(showLoading());
  const start = moment(); // start logging performance
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
    // Send event to firebase analytics
    const performance = moment().diff(start); // end logging performance
    yield firebase.analytics().logEvent(EVENT.SEARCH_RECOMMENDATIONS, params);
    yield firebase.analytics().logEvent(EVENT.GET_RECOMMENDATIONS_PERFORMANCE, {
      milliseconds: performance,
    });
  } catch (e) {
    yield put(
      updateMessage({
        message: MESSAGE.CANNOT_FIND_RECOMMENDATIONS,
        customAction: () => navigate(SCREEN.CASE),
      }),
    );
    yield put(getRecommendations.failure(e));
    yield firebase.analytics().logEvent(EVENT.SEARCH_RECOMMENDATIONS_FAILURE);
  }
  yield put(hideLoading());
}

function* createLikeSaga(action: ReturnType<typeof createLike.request>) {
  try {
    const {positive} = action.payload;
    const placeID: RootState['recommendations']['selectedID'] = yield select(
      (state: RootState) => state.recommendations.selectedID,
    );
    if (!placeID) throw new Error('There is no selected recommendation');
    const like = {placeID, positive};

    yield call(userApi.createLike, like);
    yield put(createLike.success({positive}));
    yield put(addLike(like));

    yield put(
      updateMessage({message: MESSAGE[positive ? 'POSITIVE' : 'NEGATIVE']}),
    );
    yield firebase.analytics().logEvent(EVENT.RATE_RECOMMENDATION, {
      positive: positive ? 'true' : 'false',
      placeID,
    });
    yield delay(5000);
    yield put(updateMessage({message: MESSAGE.SHOW_RECOMMENDATIONS}));
  } catch (e) {
    yield put(createLike.failure(e));
  }
}

function* deleteLikeSaga(action: ReturnType<typeof deleteLike.request>) {
  try {
    const like = action.payload;
    yield call(userApi.deleteLike, like);
    yield put(deleteLike.success(like));
    yield put(removeLike(like));

    yield firebase.analytics().logEvent(EVENT.RESET_RATE_RECOMMENDATION);
  } catch (e) {
    yield put(deleteLike.failure(e));
  }
}

function* clearRecommendationsSaga() {
  const {maxSwipedIndex}: RootState['recommendations'] = yield select(
    (state: RootState) => state.recommendations,
  );
  if (maxSwipedIndex > 0)
    yield firebase.analytics().logEvent(EVENT.VISITED_RECOMMENDATIONS, {
      count: maxSwipedIndex + 1,
    });

  yield put(clearRecommendations.success());
}

export default function* root() {
  // async
  yield takeEvery(getRecommendations.request, getRecommendationsSaga);
  yield takeEvery(createLike.request, createLikeSaga);
  yield takeEvery(deleteLike.request, deleteLikeSaga);
  yield takeEvery(clearRecommendations.request, clearRecommendationsSaga);
  // sync
}
