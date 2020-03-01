import {createAsyncAction, ActionType, createAction} from 'typesafe-actions';
import {AxiosError} from 'axios';

import {SignupReq, AuthError} from '@services/auth';
import {AuthInterface} from '@store/reducers/auth';

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

// SIGNUP
export const SIGNUP = '@auth/SIGNUP_REUQEST';
export const SIGNUP_SUCCESS = '@auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = '@auth/SIGNUP_FAILURE';

export const signup = createAsyncAction(SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE)<
  SignupReq,
  AuthInterface,
  AxiosError<AuthError>
>();
// END SIGNUP

// LOGOUT
export const LOGOUT = '@auth/LOGOUT';

export const logout = createAction(LOGOUT)();
// END LOGOUT

const actions = {
  checkKeychain,
  loginWithFacebook,
  loginWithGoogle,
  signup,
  logout,
};
export type AuthAction = ActionType<typeof actions>;
