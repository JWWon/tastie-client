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

import {SCREEN} from '@utils/consts';
import {UserInterface} from '@store/reducers/auth';
import {checkKeychain, loginWithFacebook} from '../actions/auth';

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
    // TODO: Check if token is valid
    yield put(
      checkKeychain.success({
        provider: 'email',
        accessToken: 'sampletoken',
        name: '나야나',
        email: 'example@mail.com',
      }),
    );
    yield firebase.analytics().setCurrentScreen(SCREEN.CASE, SCREEN.CASE);
  } catch (e) {
    yield put(checkKeychain.failure(e));
    yield firebase.analytics().setCurrentScreen(SCREEN.WELCOME, SCREEN.WELCOME);
  }
}

interface SuccessChannel {
  error?: object;
  response?: {
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
    if (loginRes.isCancelled) {
      throw new Error('Login cancelled by user');
    }
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
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      if (!response) {
        return;
      }

      const {birthday, ...res} = response;
      const payload: UserInterface = {
        provider: 'facebook',
        accessToken,
        ...res,
      };
      if (birthday) {
        const birthYear = birthday.match(/\d{4}/i);
        if (birthYear) {
          payload.birthYear = birthYear[0];
        }
      }

      // TODO: save access info to keychain
      yield put(checkKeychain.success(payload));
    });
  } catch (e) {
    yield put(loginWithFacebook.failure(e));
  }
}

export default function* root() {
  // acync
  yield takeEvery(checkKeychain.request, checkKeychainSaga);
  yield takeEvery(loginWithFacebook.request, loginWithFacebookSaga);
  // sync
}
