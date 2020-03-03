import {createAsyncAction, ActionType, createAction} from 'typesafe-actions';
import {GeoError} from 'react-native-geolocation-service';
import {AxiosError} from 'axios';

import {ResponseError} from '@services/axios.base';
import {GetTokenReq} from '@services/auth';
import {SignupReq} from '@services/auth';
import {AuthInterface} from '@store/reducers/auth';
import {CoordsInterface} from '@store/reducers/case';

// CHECK_KEYCHAIN
export const CHECK_KEYCHAIN = '@auth/CHECK_KEYCHAIN_REQUEST';
export const CHECK_KEYCHAIN_SUCCESS = '@auth/CHECK_KEYCHAIN_SUCCESS';
export const CHECK_KEYCHAIN_FAILURE = '@auth/CHECK_KEYCHAIN_FAILURE';

export const checkKeychain = createAsyncAction(
  CHECK_KEYCHAIN,
  CHECK_KEYCHAIN_SUCCESS,
  CHECK_KEYCHAIN_FAILURE,
)<undefined, AuthInterface, any>();
// END CHECK_KEYCHAIN

// LOGIN_WITH_FACEBOOK
export const LOGIN_WITH_FACEBOOK = '@auth/LOGIN_WITH_FACEBOOK_REQUEST';
export const LOGIN_WITH_FACEBOOK_SUCCESS = '@auth/LOGIN_WITH_FACEBOOK_SUCCESS';
export const LOGIN_WITH_FACEBOOK_FAILURE = '@auth/LOGIN_WITH_FACEBOOK_FAILURE';

export const loginWithFacebook = createAsyncAction(
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  LOGIN_WITH_FACEBOOK_FAILURE,
)<undefined, AuthInterface, any>();
// END LOGIN_WITH_FACEBOOK

// LOGIN_WITH_GOOGLE
export const LOGIN_WITH_GOOGLE = '@auth/LOGIN_WITH_GOOGLE_REQUEST';
export const LOGIN_WITH_GOOGLE_SUCCESS = '@auth/LOGIN_WITH_GOOGLE_SUCCESS';
export const LOGIN_WITH_GOOGLE_FAILURE = '@auth/LOGIN_WITH_GOOGLE_FAILURE';

export const loginWithGoogle = createAsyncAction(
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_GOOGLE_SUCCESS,
  LOGIN_WITH_GOOGLE_FAILURE,
)<undefined, AuthInterface, any>();
// END LOGIN_WITH_GOOGLE

// LOGIN_WITH_EMAIL
export const LOGIN_WITH_EMAIL = '@auth/LOGIN_WITH_EMAIL_REQUEST';
export const LOGIN_WITH_EMAIL_SUCCESS = '@auth/LOGIN_WITH_EMAIL_SUCCESS';
export const LOGIN_WITH_EMAIL_FAILURE = '@auth/LOGIN_WITH_EMAIL_FAILURE';

export const loginWithEmail = createAsyncAction(
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILURE,
)<Omit<GetTokenReq, 'type'>, AuthInterface, AxiosError<ResponseError>>();
// END LOGIN_WITH_EMAIL

// SIGNUP
export const SIGNUP = '@auth/SIGNUP_REUQEST';
export const SIGNUP_SUCCESS = '@auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = '@auth/SIGNUP_FAILURE';

export const signup = createAsyncAction(SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE)<
  SignupReq,
  AuthInterface,
  AxiosError<ResponseError>
>();
// END SIGNUP

// LOGOUT
export const LOGOUT = '@auth/LOGOUT';

export const logout = createAction(LOGOUT)();
// END LOGOUT

// GET_USER_COORDS
export const GET_USER_COORDS = '@auth/GET_USER_COORDS_REQUEST';
export const GET_USER_COORDS_SUCCESS = '@auth/GET_USER_COORDS_SUCCESS';
export const GET_USER_COORDS_FAILURE = '@auth/GET_USER_COORDS_FAILURE';

export const getUserCoords = createAsyncAction(
  GET_USER_COORDS,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
)<undefined, CoordsInterface, GeoError>();
// END GET_USER_COORDS

const actions = {
  checkKeychain,
  loginWithFacebook,
  loginWithGoogle,
  loginWithEmail,
  signup,
  logout,
  getUserCoords,
};
export type AuthAction = ActionType<typeof actions>;
