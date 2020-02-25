import {take, takeEvery, put, fork, call} from 'redux-saga/effects';
import {channel} from 'redux-saga';
import firebase from '@react-native-firebase/app';
import * as Keychain from 'react-native-keychain';
import {
  AccessToken,
  LoginManager,
  LoginResult,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {GoogleSignin, User} from '@react-native-community/google-signin';

import {SCREEN} from '@utils/consts';
import {GOOGLE_WEB_CLIENT} from '@utils/env';
import {AuthInterface} from '@store/reducers/auth';
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

function* checkKeychainSaga() {
  try {
    const credentials: KeychainInterface = yield call(
      Keychain.getGenericPassword,
    );
    if (!credentials || !credentials.username) {
      yield call(Keychain.resetGenericPassword);
      throw new Error('No credentials stored.');
    }

    const auth: AuthInterface = JSON.parse(credentials.password);
    // TODO: Check if token is valid
    switch (auth.provider) {
      case 'email':
        yield put(checkKeychain.success(auth));
        break;
      case 'facebook':
        yield put(checkKeychain.success(auth));
        break;
      case 'google':
        yield put(checkKeychain.success(auth));
        break;
    }

    yield firebase.analytics().setCurrentScreen(SCREEN.CASE, SCREEN.CASE);
  } catch (e) {
    yield put(checkKeychain.failure(e));
    yield firebase.analytics().setCurrentScreen(SCREEN.WELCOME, SCREEN.WELCOME);
  }
}

interface SuccessChannel {
  error?: object;
  response?: {
    id: string;
    name: string;
    email: string;
    birthday?: string;
  };
}

function* loginWithFacebookSaga() {
  try {
    const loginRes: LoginResult = yield call(
      LoginManager.logInWithPermissions,
      ['public_profile', 'email', 'user_birthday'],
    );
    if (loginRes.isCancelled) throw new Error('Login cancelled by user');

    const {accessToken}: AccessToken = yield call(
      AccessToken.getCurrentAccessToken,
    );
    // TODO: Check if user data exists on db

    const successChannel = yield call(channel);
    const graph = new GraphRequest(
      '/me',
      {
        accessToken,
        httpMethod: 'GET',
        parameters: {
          fields: {string: 'name,email,birthday'},
        },
      },
      (error, response) => successChannel.put({error, response}),
    );
    new GraphRequestManager().addRequest(graph).start();

    yield fork(function*() {
      const {error, response}: SuccessChannel = yield take(successChannel);
      if (error) throw new Error(JSON.stringify(error));
      if (!response) return;

      const {birthday, name, email} = response;
      const payload: AuthInterface = {
        provider: 'facebook',
        accessToken,
        email,
        name,
      };
      if (birthday) {
        const birthYear = birthday.match(/\d{4}/i);
        if (birthYear) {
          payload.birthYear = birthYear[0];
        }
      }

      yield call(Keychain.setGenericPassword, name, JSON.stringify(payload));
      yield put(loginWithFacebook.success(payload));
    });
  } catch (e) {
    yield put(loginWithFacebook.failure(e));
  }
}

function* loginWithGoogleSaga() {
  try {
    yield call(GoogleSignin.configure, {webClientId: GOOGLE_WEB_CLIENT});
    yield call(GoogleSignin.hasPlayServices);
    const {user, idToken}: User = yield call(GoogleSignin.signIn);
    // TODO: Check if user data exists on db

    const name = user.name || '';
    const payload: AuthInterface = {
      provider: 'google',
      accessToken: idToken,
      email: user.email,
      name,
    };

    yield call(Keychain.setGenericPassword, name, JSON.stringify(payload));
    yield put(loginWithGoogle.success(payload));
  } catch (e) {
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
