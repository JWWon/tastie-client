import {all, call, put, select, takeEvery} from 'redux-saga/effects';
import firebase from '@react-native-firebase/app';
import {AxiosResponse} from 'axios';
import * as moment from 'moment';

import {
  clearCase,
  clearCasePartly,
  getCategories,
  getSituations,
  SELECT_CATEGORY,
  SELECT_SITUATION,
  selectCategory,
  selectSituation,
  updateHasRequired,
  selectLocation,
  getNearbyLocations,
  searchLocations,
  getPreferences,
} from '@store/actions/case';
import {getUserCoords} from '@store/actions/auth';
import {clearRecommendations} from '@store/actions/recommendations';
import {RootState} from '@store/reducers';
import {CaseIndex} from '@store/reducers/case';
import {updateMessage, showLoading, hideLoading} from '@store/actions/navbar';
import {
  GetCategoriesRes,
  GetSituationsRes,
  GetNearbyLocationsRes,
  SearchLocationsAPIRes,
  SearchLocationsRes,
  GetLocationDetailsAPIRes,
  GetPreferencesRes,
} from '@services/case';
import * as api from '@services/case';
import {getAddress, GetAddressRes} from '@services/coordinate';
import {MY_LOCATION, EVENT} from '@utils/consts';

function* clearCaseSaga() {
  const {maxSwipedIndex}: RootState['recommendations'] = yield select(
    (state: RootState) => state.recommendations,
  );
  if (maxSwipedIndex > 0) {
    yield firebase.analytics().logEvent(EVENT.VISITED_RECOMMENDATIONS, {
      count: maxSwipedIndex + 1,
    });
  }

  yield all([
    put(getUserCoords.request()),
    put(getCategories.request()),
    put(clearRecommendations()),
  ]);
}

function* clearCasePartlySaga(action: ReturnType<typeof clearCasePartly>) {
  if (action.payload !== CaseIndex.PREFERENCE) {
    yield put(
      updateMessage({message: '다시 고르겠나옹?', customAction: undefined}),
    );
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
  yield put(showLoading());
  try {
    const {category}: RootState['case'] = yield select(state => state.case);
    const response: AxiosResponse<GetSituationsRes> = yield call(
      api.getSituations,
      {category},
    );
    yield put(getSituations.success(response.data));
  } catch (e) {
    yield put(getSituations.failure(e));
  }
  yield put(hideLoading());
}

function* getNearbyLocationSaga(
  action: ReturnType<typeof getNearbyLocations.request>,
) {
  yield put(showLoading());
  try {
    const response: AxiosResponse<GetNearbyLocationsRes> = yield call(
      api.getNearbyLocations,
      action.payload,
    );
    yield put(getNearbyLocations.success(response.data));
  } catch (e) {
    yield put(getNearbyLocations.failure(e));
  }
  yield put(hideLoading());
}

function* searchLocationsSaga(
  action: ReturnType<typeof searchLocations.request>,
) {
  yield put(showLoading());
  if (action.payload.input === '') {
    // skip searching if input is empty
    yield put(searchLocations.success([]));
    yield put(hideLoading());
    return;
  }

  try {
    const {userCoords}: RootState['auth'] = yield select(state => state.auth);
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
    yield put(updateMessage({message: '장소를 선택하라옹'}));
    yield put(searchLocations.success(flatten));
  } catch (e) {
    yield put(updateMessage({message: '검색결과를 찾지 못했어옹...'}));
    yield put(searchLocations.failure(e));
  }
  yield put(hideLoading());
}

function* getPreferencesSaga() {
  yield put(showLoading());
  try {
    const {situation}: RootState['case'] = yield select(state => state.case);
    const response: AxiosResponse<GetPreferencesRes> = yield call(
      api.getPreferences,
      {situation},
    );
    yield put(getPreferences.success(response.data));
  } catch (e) {
    yield put(getPreferences.failure(e));
  }
  yield put(hideLoading());
}

function* selectLocationSaga(
  action: ReturnType<typeof selectLocation.request>,
) {
  try {
    const {name, location, place_id} = action.payload;
    if (name === MY_LOCATION) {
      // * current user location
      const {userCoords}: RootState['auth'] = yield select(state => state.auth);
      const {data: address}: AxiosResponse<GetAddressRes> = yield call(
        getAddress,
        userCoords,
      );
      yield put(selectLocation.success({name, address, ...userCoords}));
      return;
    }

    if (location !== undefined) {
      // * select from 'nearbyLocations'
      const {data: address}: AxiosResponse<GetAddressRes> = yield call(
        getAddress,
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
  yield call(validateInfo, action.payload.onPress, '어디서 먹나옹?');
  yield put(getSituations.request());
}

function* selectSituationSaga(action: ReturnType<typeof selectSituation>) {
  yield call(validateInfo, action.payload.onPress);
}

// MIDDLEWARE OF MIDDLEWARE
function* validateInfo(customAction: () => void, message?: string) {
  const {category, situation, location}: RootState['case'] = yield select(
    state => state.case,
  );
  const hasRequired =
    category !== '' && situation !== '' && location.name !== '';

  if (hasRequired) {
    yield put(updateMessage({message: '뭐 먹을지 정해줄까옹?', customAction}));
  } else if (message) {
    yield put(updateMessage({message}));
  }

  yield put(updateHasRequired({hasRequired}));
}

export default function* root() {
  // async
  yield takeEvery(getCategories.request, getCategoriesSaga);
  yield takeEvery(getSituations.request, getSituationsSaga);
  yield takeEvery(getNearbyLocations.request, getNearbyLocationSaga);
  yield takeEvery(searchLocations.request, searchLocationsSaga);
  yield takeEvery(getPreferences.request, getPreferencesSaga);
  yield takeEvery(selectLocation.request, selectLocationSaga);
  // sync
  yield takeEvery(clearCase, clearCaseSaga);
  yield takeEvery(clearCasePartly, clearCasePartlySaga);
  yield takeEvery(SELECT_CATEGORY, selectCategorySaga);
  yield takeEvery(SELECT_SITUATION, selectSituationSaga);
}
