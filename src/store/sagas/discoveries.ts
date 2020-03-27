import {call, put, delay, select, takeEvery} from 'redux-saga/effects';
import produce from 'immer';
import moment from 'moment';
import firebase from '@react-native-firebase/app';
import _ from 'lodash';
import {AxiosResponse} from 'axios';

import {
  getDiscoveries,
  createLike,
  deleteLike,
  clearDiscoveries,
} from '@store/actions/discoveries';
import {addLike, removeLike} from '@store/actions/history';
import {updateMessage, showLoading, hideLoading} from '@store/actions/navbar';
import {navigate} from '@utils/RootService';
import * as api from '@services/discoveries';
import * as userApi from '@services/user';
import {RootState} from '@store/reducers';
import {SCREEN, EVENT, MESSAGE} from '@utils/consts';
import {getDistance} from '@utils/helper';

// HELPERS
function* mapAdditionalInfos(data: api.GetDiscoveriesRes) {
  const {userCoords}: RootState['auth'] = yield select(
    (state: RootState) => state.auth,
  );
  const {likes}: RootState['history'] = yield select(
    (state: RootState) => state.history,
  );

  const nextData = data.map(item =>
    produce(item, draft => {
      // map distance
      if (userCoords) {
        draft.distance = getDistance(userCoords, item.location);
      }
      // map positive
      const idx = _.findIndex(likes, like => like.placeID === item.id);
      if (idx !== -1) draft.positive = likes[idx].positive;
    }),
  );
  return nextData;
}

// SAGAS
function* getDiscoveriesSaga() {
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

    const payload: api.GetDiscoveriesReq = {
      category,
      situation,
      ..._.pick(location, ['latitude', 'longitude']),
    };
    const params = {...payload, ...(preference ? {preference} : undefined)};

    const {data}: AxiosResponse<api.GetDiscoveriesRes> = yield call(
      api.getDiscoveries,
      payload,
    );
    if (data.length === 0) throw new Error('Discovery is empty.');

    const discoveries: api.GetDiscoveriesRes = yield call(
      mapAdditionalInfos,
      data,
    );
    yield put(getDiscoveries.success(discoveries));
    // Send event to firebase analytics
    const performance = moment().diff(start); // end logging performance
    yield firebase.analytics().logEvent(EVENT.GET_DISCOVERIES, params);
    yield firebase.analytics().logEvent(EVENT.GET_DISCOVERIES_PERFORMANCE, {
      milliseconds: performance,
    });
  } catch (e) {
    yield put(
      updateMessage({
        message: MESSAGE.FAIL_TO_DISCOVER,
        customAction: () => navigate(SCREEN.CASE),
      }),
    );
    yield put(getDiscoveries.failure(e));
    yield firebase.analytics().logEvent(EVENT.GET_DISCOVERIES_FAILURE);
  }
  yield put(hideLoading());
}

function* createLikeSaga(action: ReturnType<typeof createLike.request>) {
  try {
    const {positive} = action.payload;
    const placeID: RootState['discoveries']['selectedID'] = yield select(
      (state: RootState) => state.discoveries.selectedID,
    );
    if (!placeID) throw new Error('There is no selected discovery');
    const like = {placeID, positive};

    yield call(userApi.createLike, like);
    yield put(createLike.success({positive}));
    yield put(addLike({...like, updatedAt: moment().format()}));

    yield put(
      updateMessage({message: MESSAGE[positive ? 'POSITIVE' : 'NEGATIVE']}),
    );
    yield firebase.analytics().logEvent(EVENT.RATE_DISCOVERY, {
      positive: positive ? 'true' : 'false',
      placeID,
    });
    yield delay(3600);
    yield put(updateMessage({message: MESSAGE.SHOW_DISCOVERIES}));
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

    yield firebase.analytics().logEvent(EVENT.RESET_RATE_DISCOVERY);
  } catch (e) {
    yield put(deleteLike.failure(e));
  }
}

function* clearDiscoveriesSaga() {
  const {maxSwipedIndex}: RootState['discoveries'] = yield select(
    (state: RootState) => state.discoveries,
  );
  if (maxSwipedIndex > 0)
    yield firebase.analytics().logEvent(EVENT.VISITED_DISCOVERIES, {
      count: maxSwipedIndex + 1,
    });

  yield put(clearDiscoveries.success());
}

export default function* root() {
  // async
  yield takeEvery(getDiscoveries.request, getDiscoveriesSaga);
  yield takeEvery(createLike.request, createLikeSaga);
  yield takeEvery(deleteLike.request, deleteLikeSaga);
  yield takeEvery(clearDiscoveries.request, clearDiscoveriesSaga);
  // sync
}
