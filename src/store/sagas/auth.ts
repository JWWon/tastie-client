import {AxiosResponse, AxiosError} from 'axios';
import {takeEvery, put, call, all, race, fork, take} from 'redux-saga/effects';
import {channel} from 'redux-saga';
import _ from 'lodash';
import decode from 'jwt-decode';
import * as Keychain from 'react-native-keychain';
import Geolocation from 'react-native-geolocation-service';
import {AccessToken, LoginManager, LoginResult} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from '@react-native-firebase/app';

import * as api from '@services/auth';
import * as userApi from '@services/user';
import axios, {ResponseError} from '@services/axios.base';
import {SCREEN, EVENT} from '@utils/consts';
import {isAxiosError, checkPermission} from '@utils/helper';
import {navigate, useLoginFormik, useSignupFormik} from '@utils/SessionService';
import {AuthInterface} from '@store/reducers/auth';
import {clearNavbar} from '@store/actions/navbar';
import {
  checkKeychain,
  loginWithFacebook,
  loginWithGoogle,
  signup,
  logout,
  loginWithEmail,
  getUserCoords,
} from '@store/actions/auth';
import {CoordsInterface} from '@store/reducers/case';
import {getNearbyLocations} from '@store/actions/case';

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
const mapUserProperties = ({birthYear, ...auth}: AuthInterface) => ({
  ...auth,
  birthYear: birthYear ? birthYear.toString() : null,
});

function* getAuthFromJWT(data: api.GetTokenRes, checkValid?: boolean) {
  let latestData: Pick<AuthInterface, 'name' | 'email'> | undefined;
  // Set Axios header
  yield axios.setToken(data.accessToken);
  // [Option] Check token is valid
  if (checkValid) {
    const response: AxiosResponse<userApi.UserInfo> = yield call(
      userApi.getUserInfo,
    );
    latestData = _.pick(response.data, ['name', 'email']);
  }
  // Save data to Keychain
  const rawAuth: DecodeAccessToken = {
    ...decode(data.accessToken),
    ...latestData,
    type: data.type,
  };
  const auth: AuthInterface = _.omit(rawAuth, ['exp', 'iat', 'sub']);
  yield call(Keychain.setGenericPassword, auth.name, JSON.stringify(data));
  // Log analytics
  yield firebase.analytics().setUserId(auth.email);
  yield firebase.analytics().setUserProperties(mapUserProperties(auth));
  yield firebase.analytics().logLogin({method: auth.type});

  return auth;
}

function* handleBackendError(e: any) {
  if (isAxiosError(e)) {
    const {response}: AxiosError<ResponseError> = e;
    switch (response?.status) {
      case 401:
        // Invalid user credential
        const loginFormik = useLoginFormik();
        if (loginFormik) {
          yield call(loginFormik.setErrors, {
            email: response.data.message,
            password: '',
          });
        }
        break;
      case 404:
        // User isn't registered
        const data: api.GetTokenReq = JSON.parse(response?.config.data);
        yield call(navigate, SCREEN.SIGNUP_META, data);
        break;
      case 409:
        // User already exist
        const signupFormik = useSignupFormik();
        if (signupFormik) {
          yield call(signupFormik.setErrors, {
            email: response.data.message,
            password: '',
            confirmPwd: '',
          });
        }
        break;
      default:
        // Unexpected error
        console.warn(response?.data);
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
      throw new Error('No credentials stored.');
    }

    const data: api.GetTokenRes = JSON.parse(credentials.password);
    const auth: AuthInterface = yield call(getAuthFromJWT, data, true);
    yield put(checkKeychain.success(auth));
  } catch (e) {
    yield call(logoutSaga);
    yield put(checkKeychain.failure(e));
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
    const auth: AuthInterface = yield call(getAuthFromJWT, {
      ...response.data,
      type: 'facebook', // re-map type for firebase
    });
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
    const auth: AuthInterface = yield call(getAuthFromJWT, {
      ...response.data,
      type: 'google', // re-map type for firebase
    });
    yield put(loginWithFacebook.success(auth));
  } catch (e) {
    yield call(handleBackendError, e);
    yield put(loginWithGoogle.failure(e));
  }
}

function* loginWithEmailSaga(
  action: ReturnType<typeof loginWithEmail.request>,
) {
  try {
    const response: AxiosResponse<api.GetTokenRes> = yield call(api.getToken, {
      type: 'email',
      ...action.payload,
    });
    const auth: AuthInterface = yield call(getAuthFromJWT, {
      ...response.data,
      type: 'email', // re-map type for firebase
    });
    yield put(loginWithEmail.success(auth));
  } catch (e) {
    yield call(handleBackendError, e);
    yield put(loginWithEmail.failure(e));
  }
}

function* signupSaga(action: ReturnType<typeof signup.request>) {
  try {
    yield call(api.signup, action.payload);
    const response: AxiosResponse<api.GetTokenRes> = yield call(
      api.getToken,
      _.omit(action.payload, ['name', 'birthYear']),
    );
    const auth: AuthInterface = yield call(getAuthFromJWT, {
      ...response.data,
      type: action.payload.type, // re-map type for firebase
    });
    yield put(signup.success(auth));
    yield firebase.analytics().logEvent(EVENT.SIGNUP, mapUserProperties(auth));
  } catch (e) {
    yield call(handleBackendError, e);
    yield put(signup.failure(e));
  }
}

function* logoutSaga() {
  yield call(Keychain.resetGenericPassword);
  yield call(axios.removeToken);
  yield all([put(clearNavbar())]);
  yield firebase.analytics().logEvent(EVENT.LOGOUT);
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
      take(successChannel), // CoordsInterface
      take(failureChannel),
    ]);

    if (coords) {
      yield put(getUserCoords.success(coords));
      yield put(getNearbyLocations.request({...coords, count: 8}));
      yield firebase.analytics().logEvent(EVENT.USER_COORDINATE, coords);
    }
    if (error) {
      yield put(getUserCoords.failure(error));
    }
  });
}

export default function* root() {
  // acync
  yield takeEvery(checkKeychain.request, checkKeychainSaga);
  yield takeEvery(loginWithFacebook.request, loginWithFacebookSaga);
  yield takeEvery(loginWithGoogle.request, loginWithGoogleSaga);
  yield takeEvery(loginWithEmail.request, loginWithEmailSaga);
  yield takeEvery(signup.request, signupSaga);
  yield takeEvery(getUserCoords.request, getUserCoordsSaga);
  // sync
  yield takeEvery(logout, logoutSaga);
}
