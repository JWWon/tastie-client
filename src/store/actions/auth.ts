import {createAsyncAction, ActionType} from 'typesafe-actions';

import {UserInterface} from '../reducers/auth';

// CHECK_KEYCHAIN
export const CHECK_KEYCHAIN = '@auth/CHECK_KEYCHAIN_REQUEST';
export const CHECK_KEYCHAIN_SUCCESS = '@auth/CHECK_KEYCHAIN_SUCCESS';
export const CHECK_KEYCHAIN_FAILURE = '@auth/CHECK_KEYCHAIN_FAILURE';

export const checkKeychain = createAsyncAction(
  CHECK_KEYCHAIN,
  CHECK_KEYCHAIN_SUCCESS,
  CHECK_KEYCHAIN_FAILURE,
)<undefined, UserInterface, Error>();
// END CHECK_KEYCHAIN

// LOGIN_WITH_FACEBOOK
export const LOGIN_WITH_FACEBOOK = '@auth/LOGIN_WITH_FACEBOOK_REQUEST';
export const LOGIN_WITH_FACEBOOK_SUCCESS = '@auth/LOGIN_WITH_FACEBOOK_SUCCESS';
export const LOGIN_WITH_FACEBOOK_FAILURE = '@auth/LOGIN_WITH_FACEBOOK_FAILURE';

export const loginWithFacebook = createAsyncAction(
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  LOGIN_WITH_FACEBOOK_FAILURE,
)<undefined, UserInterface, any>();
// END LOGIN_WITH_FACEBOOK

const actions = {
  checkKeychain,
  loginWithFacebook,
};
export type AuthAction = ActionType<typeof actions>;
