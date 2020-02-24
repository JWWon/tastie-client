import firebase from '@react-native-firebase/app';
import {takeEvery, put, call} from 'redux-saga/effects';
import * as Keychain from 'react-native-keychain';

import {SCREEN} from '@utils/consts';
import {checkKeychain} from '../actions/auth';

function* checkKeychainSaga() {
  try {
    const credentials = yield call(Keychain.getGenericPassword);
    if (!credentials) {
      throw new Error('No credentials stored.');
    }
    // TODO: if credencial exists, check if it is a valid token.
    yield put(checkKeychain.success(credentials));
    yield firebase.analytics().setCurrentScreen(SCREEN.CASE, SCREEN.CASE);
  } catch (e) {
    yield put(checkKeychain.failure(e));
    yield firebase.analytics().setCurrentScreen(SCREEN.WELCOME, SCREEN.WELCOME);
  }
}

export default function* root() {
  // acync
  yield takeEvery(checkKeychain.request, checkKeychainSaga);
  // sync
}
