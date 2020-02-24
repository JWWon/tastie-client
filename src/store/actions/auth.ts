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

const actions = {
  checkKeychain,
};
export type AuthAction = ActionType<typeof actions>;
