import {
  all,
  call,
  put,
  select,
  fork,
  take,
  takeEvery,
  race,
} from 'redux-saga/effects';
import Geolocation from 'react-native-geolocation-service';
import firebase from '@react-native-firebase/app';
import {AxiosResponse} from 'axios';
import {channel} from 'redux-saga';
import * as moment from 'moment';
import _ from 'lodash';

import {
  clearCase,
  clearCasePartly,
  getCategories,
  getSituations,
  getUserCoords,
  SELECT_CATEGORY,
  SELECT_SITUATION,
  selectCategory,
  selectSituation,
  updateHasRequired,
  selectLocation,
  getNearbyLocations,
  searchLocations,
} from '@store/actions/case';
import {RootState} from '@store/reducers';
import {CoordsInterface, CaseIndex} from '@store/reducers/case';
import {updateContent, updateLoading} from '@store/actions/message';
import {
  GetCategoriesRes,
  GetSituationsRes,
  GetNearbyLocationsRes,
  SearchLocationsAPIRes,
  SearchLocationsRes,
  GetLocationDetailsAPIRes,
  GetAddressRes,
} from '@services/case';
import * as api from '@services/case';
import consts from '@utils/consts';
import {checkPermission} from '@utils/helper';

const {MY_LOCATION} = consts;

function* clearCaseSaga() {
  yield all([
    put(getUserCoords.request()),
    put(getCategories.request()),
    put(getSituations.request()),
  ]);
}

function* clearCasePartlySaga(action: ReturnType<typeof clearCasePartly>) {
  if (action.payload !== CaseIndex.PREFERENCE) {
    yield put(updateContent({content: '다시 고르겠나옹?', onPress: undefined}));
  }
}

function* getCategoriesSaga() {
  try {
    const response: AxiosResponse<GetCategoriesRes> = yield call(
      api.getCategories,
      {date: moment.utc()},
    );
    yield put(getCategories.success(response.data));
  } catch (e) {
    yield put(getCategories.failure(e));
  }
}

function* getSituationsSaga() {
  try {
    const response: AxiosResponse<GetSituationsRes> = yield call(
      api.getSituations,
      {date: moment.utc()},
    );
    yield put(getSituations.success(response.data));
  } catch (e) {
    yield put(getSituations.failure(e));
  }
}

function* getUserCoordsSaga() {
  const successChannel = yield call(channel);
  const failureChannel = yield call(channel);

  yield call(checkPermission);
  yield call(
    Geolocation.getCurrentPosition,
    ({coords}): CoordsInterface =>
      successChannel.put(_.pick(coords, ['latitude', 'longitude'])),
    e => failureChannel.put(e),
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );

  yield fork(function*() {
    const [coords, error] = yield race([
      take(successChannel),
      take(failureChannel),
    ]);

    if (coords) {
      yield put(getUserCoords.success(coords));
      yield put(getNearbyLocations.request({...coords, count: 10}));
      yield firebase.analytics().logEvent('user_location', coords);
    }
    if (error) {
      yield put(getUserCoords.failure(error));
    }
  });
}

function* getNearbyLocationSaga(
  action: ReturnType<typeof getNearbyLocations.request>,
) {
  yield put(updateLoading({loading: true}));
  try {
    const response: AxiosResponse<GetNearbyLocationsRes> = yield call(
      api.getNearbyLocations,
      action.payload,
    );
    yield put(getNearbyLocations.success(response.data));
  } catch (e) {
    yield put(getNearbyLocations.failure(e));
  }
  yield put(updateLoading({loading: false}));
}

function* searchLocationsSaga(
  action: ReturnType<typeof searchLocations.request>,
) {
  yield put(updateLoading({loading: true}));
  if (action.payload.input === '') {
    // skip searching if input is empty
    yield put(searchLocations.success([]));
    yield put(updateLoading({loading: false}));
    return;
  }

  try {
    const {userCoords} = yield select((state: RootState) => state.case);
    const response: AxiosResponse<SearchLocationsAPIRes> = yield call(
      api.searchLocations,
      {
        ...action.payload,
        location: userCoords,
        radius: 10000, // 10km
        types: 'establishment',
        language: 'ko',
      },
    );

    const flatten: SearchLocationsRes = response.data.predictions.map(item => ({
      name: item.structured_formatting.main_text,
      place_id: item.place_id,
    }));
    yield put(updateContent({content: '장소를 선택하라옹'}));
    yield put(searchLocations.success(flatten));
    yield firebase.analytics().logEvent('search_location_name', action.payload);
  } catch (e) {
    yield put(updateContent({content: '검색결과를 찾지 못했어옹...'}));
    yield put(searchLocations.failure(e));
  }
  yield put(updateLoading({loading: false}));
}

function* selectLocationSaga(
  action: ReturnType<typeof selectLocation.request>,
) {
  try {
    const {name, location, place_id} = action.payload;
    if (name === MY_LOCATION) {
      // * current user location
      const {userCoords}: RootState['case'] = yield select(
        (state: RootState) => state.case,
      );
      const {data: address}: AxiosResponse<GetAddressRes> = yield call(
        api.getAddress,
        userCoords,
      );
      yield put(selectLocation.success({name, address, ...userCoords}));
      return;
    }

    if (location !== undefined) {
      // * select from 'nearbyLocations'
      const {data: address}: AxiosResponse<GetAddressRes> = yield call(
        api.getAddress,
        location,
      );
      yield put(selectLocation.success({name, address, ...location}));
      return;
    }

    if (place_id !== undefined) {
      // * select from 'searchedLocations'
      const response: AxiosResponse<GetLocationDetailsAPIRes> = yield call(
        api.getLocationDetails,
        {
          place_id,
          language: 'ko',
          fields: 'address_component,geometry',
        },
      );
      // formatting data
      const {address_components, geometry} = response.data.result;
      const address = address_components
        .slice(0, address_components.length - 2)
        .reverse()
        .map(item => item.short_name.replace(/\s+/g, ''))
        .join(' ');
      const {lat: latitude, lng: longitude} = geometry.location;

      yield put(selectLocation.success({name, address, latitude, longitude}));
      return;
    }

    throw new Error('잘못된 데이터입니다.');
  } catch (e) {
    yield put(selectLocation.failure(e));
  }
}

function* selectCategorySaga(action: ReturnType<typeof selectCategory>) {
  yield call(checkRequiredInfo, action.payload.onPress, '어디서 먹나옹?');
}

function* selectSituationSaga(action: ReturnType<typeof selectSituation>) {
  yield call(checkRequiredInfo, action.payload.onPress);
}

// MIDDLEWARE OF MIDDLEWARE
function* checkRequiredInfo(onPress: () => void, content?: string) {
  const {category, situation, location}: RootState['case'] = yield select(
    (state: RootState) => state.case,
  );
  const hasRequired =
    category !== '' && situation !== '' && location.name !== '';

  if (hasRequired) {
    yield put(updateContent({content: '뭐 먹을지 정해줄까옹?', onPress}));
  } else if (content) {
    yield put(updateContent({content}));
  }

  yield put(updateHasRequired({hasRequired}));
}

export default function* root() {
  // async
  yield takeEvery(getCategories.request, getCategoriesSaga);
  yield takeEvery(getSituations.request, getSituationsSaga);
  yield takeEvery(getUserCoords.request, getUserCoordsSaga);
  yield takeEvery(getNearbyLocations.request, getNearbyLocationSaga);
  yield takeEvery(searchLocations.request, searchLocationsSaga);
  yield takeEvery(selectLocation.request, selectLocationSaga);
  // sync
  yield takeEvery(clearCase, clearCaseSaga);
  yield takeEvery(clearCasePartly, clearCasePartlySaga);
  yield takeEvery(SELECT_CATEGORY, selectCategorySaga);
  yield takeEvery(SELECT_SITUATION, selectSituationSaga);
}
