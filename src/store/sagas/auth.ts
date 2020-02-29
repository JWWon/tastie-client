import {AxiosResponse, AxiosError} from 'axios';
import {takeEvery, put, call} from 'redux-saga/effects';
import decode from 'jwt-decode';
import firebase from '@react-native-firebase/app';
import * as Keychain from 'react-native-keychain';
import {AccessToken, LoginManager, LoginResult} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';

import * as api from '@services/auth';
import {SCREEN} from '@utils/consts';
import {AuthInterface} from '@store/reducers/auth';
import {navigate} from '@utils/navSession';
import {
  checkKeychain,
  loginWithFacebook,
  loginWithGoogle,
} from '../actions/auth';

type KeychainInterface =
  | false
  | {
      service: string;
      username: string;
      password: string;
    };

interface GetGoogleToken {
  idToken: string;
  accessToken: string;
}

// HELPERS
function isAxiosError(error: any) {
  return typeof error === 'object' && error.isAxiosError;
}

function* getAuthFromJWT(data: api.GetTokenRes) {
  const auth: AuthInterface = decode(data.accessToken);
  yield call(Keychain.setGenericPassword, auth.username, JSON.stringify(data));
  return auth;
}

function* handleGetTokenError(e: any) {
  if (isAxiosError(e)) {
    const {response}: AxiosError<api.AuthError> = e;
    switch (response?.status) {
      case 401:
        // Invalid user credential
        break;
      case 404:
        // User isn't registered
        const data: api.GetTokenReq = JSON.parse(response?.config.data);
        yield call(navigate, SCREEN.SIGNUP_META, data);
        break;
    }
  }
}

// SAGAS
function* checkKeychainSaga() {
  yield call(Keychain.resetGenericPassword);
  try {
    const credentials: KeychainInterface = yield call(
      Keychain.getGenericPassword,
    );
    if (!credentials || !credentials.username) {
      yield call(Keychain.resetGenericPassword);
      throw new Error('No credentials stored.');
    }

    const data: api.GetTokenRes = JSON.parse(credentials.password);
    // TODO: Check if token is valid
    const auth: AuthInterface = decode(data.accessToken);
    yield put(checkKeychain.success(auth));
    yield firebase.analytics().setCurrentScreen(SCREEN.CASE, SCREEN.CASE);
  } catch (e) {
    yield put(checkKeychain.failure(e));
    yield firebase.analytics().setCurrentScreen(SCREEN.WELCOME, SCREEN.WELCOME);
  }
}

function* loginWithFacebookSaga() {
  try {
    // Get accessToken from Facebook
    const loginRes: LoginResult = yield call(
      LoginManager.logInWithPermissions,
      ['public_profile', 'email', 'user_birthday'],
    );
    if (loginRes.isCancelled) throw new Error('Login cancelled by user');

    const {accessToken}: AccessToken = yield call(
      AccessToken.getCurrentAccessToken,
    );
    // Send request to backend
    const response: AxiosResponse<api.GetTokenRes> = yield call(api.getToken, {
      type: 'facebook',
      token: accessToken,
    });
    const auth = yield call(getAuthFromJWT, response.data);
    yield put(loginWithFacebook.success(auth));
  } catch (e) {
    yield call(handleGetTokenError, e);
    yield put(loginWithFacebook.failure(e));
  }
}

function* loginWithGoogleSaga() {
  try {
    // Get accessToken from Google
    yield call(GoogleSignin.hasPlayServices);
    yield call(GoogleSignin.signIn);
    const {accessToken}: GetGoogleToken = yield call(GoogleSignin.getTokens);
    // Send request to backend
    const response: AxiosResponse<api.GetTokenRes> = yield call(api.getToken, {
      type: 'google',
      token: accessToken,
    });
    const auth = yield call(getAuthFromJWT, response.data);
    yield put(loginWithFacebook.success(auth));
  } catch (e) {
    yield call(handleGetTokenError, e);
    yield put(loginWithGoogle.failure(e));
  }
}

export default function* root() {
  // acync
  yield takeEvery(checkKeychain.request, checkKeychainSaga);
  yield takeEvery(loginWithFacebook.request, loginWithFacebookSaga);
  yield takeEvery(loginWithGoogle.request, loginWithGoogleSaga);
  // sync
}
