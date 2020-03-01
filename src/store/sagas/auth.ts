import {AxiosResponse, AxiosError} from 'axios';
import {takeEvery, put, call} from 'redux-saga/effects';
import _ from 'lodash';
import {Alert} from 'react-native';
import decode from 'jwt-decode';
import firebase from '@react-native-firebase/app';
import * as Keychain from 'react-native-keychain';
import {AccessToken, LoginManager, LoginResult} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';

import * as api from '@services/auth';
import axios from '@services/axios.base';
import {SCREEN} from '@utils/consts';
import {isAxiosError} from '@utils/helper';
import {navigate} from '@utils/navSession';
import {AuthInterface} from '@store/reducers/auth';
import {
  checkKeychain,
  loginWithFacebook,
  loginWithGoogle,
  signup,
  logout,
} from '@store/actions/auth';

type KeychainInterface =
  | false
  | {
      service: string;
      username: string;
      password: string;
    };

interface DecodeAccessToken extends AuthInterface {
  exp: number;
  iat: number;
  sub: number;
}

interface GetGoogleToken {
  idToken: string;
  accessToken: string;
}

// HELPERS
function* getAuthFromJWT(data: api.GetTokenRes) {
  const auth: DecodeAccessToken = decode(data.accessToken);
  // Save data to Keychain
  yield call(Keychain.setGenericPassword, auth.name, JSON.stringify(data));
  axios.setToken(data.accessToken);
  return _.omit(auth, ['exp', 'iat', 'sub']);
}

function* handleBackendError(e: any) {
  if (isAxiosError(e)) {
    const {response}: AxiosError<api.AuthError> = e;
    switch (response?.status) {
      case 401:
        // Invalid user credential
        Alert.alert(response?.data.message);
        break;
      case 404:
        // User isn't registered
        const data: api.GetTokenReq = JSON.parse(response?.config.data);
        yield call(navigate, SCREEN.SIGNUP_META, data);
        break;
      case 409:
        // User already exist
        Alert.alert(response?.data.message);
        break;
    }
  }
}

// SAGAS
function* checkKeychainSaga() {
  try {
    const credentials: KeychainInterface = yield call(
      Keychain.getGenericPassword,
    );
    if (!credentials || !credentials.username) {
      yield call(logoutSaga);
      throw new Error('No credentials stored.');
    }

    const data: api.GetTokenRes = JSON.parse(credentials.password);
    // TODO: Check if token is valid
    const auth: AuthInterface = yield call(getAuthFromJWT, data);
    yield put(checkKeychain.success(auth));
    // Manually call before 'handleStateChange' active
    yield firebase.analytics().setCurrentScreen(SCREEN.CASE, SCREEN.CASE);
  } catch (e) {
    yield put(checkKeychain.failure(e));
    // Manually call before 'handleStateChange' active
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
    const auth: AuthInterface = yield call(getAuthFromJWT, response.data);
    yield put(loginWithFacebook.success(auth));
  } catch (e) {
    yield call(handleBackendError, e);
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
    const auth: AuthInterface = yield call(getAuthFromJWT, response.data);
    yield put(loginWithFacebook.success(auth));
  } catch (e) {
    yield call(handleBackendError, e);
    yield put(loginWithGoogle.failure(e));
  }
}

function* signupSaga(action: ReturnType<typeof signup.request>) {
  try {
    yield call(api.signup, action.payload);
    const response: AxiosResponse<api.GetTokenRes> = yield call(
      api.getToken,
      action.payload,
    );
    const auth: AuthInterface = yield call(getAuthFromJWT, response.data);
    yield put(signup.success(auth));
  } catch (e) {
    yield call(handleBackendError, e);
    yield put(signup.failure(e));
  }
}

function* logoutSaga() {
  yield call(Keychain.resetGenericPassword);
  yield call(axios.removeToken);
}

export default function* root() {
  // acync
  yield takeEvery(checkKeychain.request, checkKeychainSaga);
  yield takeEvery(loginWithFacebook.request, loginWithFacebookSaga);
  yield takeEvery(loginWithGoogle.request, loginWithGoogleSaga);
  yield takeEvery(signup.request, signupSaga);
  // sync
  yield takeEvery(logout, logoutSaga);
}
