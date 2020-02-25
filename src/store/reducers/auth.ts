import {
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_GOOGLE_SUCCESS,
  LOGIN_WITH_GOOGLE_FAILURE,
} from './../actions/auth';
import {createReducer} from 'typesafe-actions';

import {
  AuthAction,
  CHECK_KEYCHAIN,
  CHECK_KEYCHAIN_SUCCESS,
  CHECK_KEYCHAIN_FAILURE,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  LOGIN_WITH_FACEBOOK_FAILURE,
} from '../actions/auth';

export interface AuthInterface {
  provider: 'facebook' | 'google' | 'email';
  accessToken: string | null;
  name: string;
  email: string;
  birthYear?: string;
}

interface AuthState extends AuthInterface {
  status: 'PENDING' | 'SUCCESS' | 'FAILURE';
  error?: any;
}

const initState: AuthState = {
  status: 'PENDING',
  // USER INTERFACE
  provider: 'email',
  accessToken: null,
  name: '',
  email: '',
};

// HELPERS
const pending = <S>(state: S) => ({
  ...state,
  status: 'PENDING',
  error: undefined,
});
const success = <S, A extends {payload: any}>(state: S, action: A) => ({
  ...state,
  ...action.payload,
  status: 'SUCCESS',
});
const failure = <S, A extends {payload: any}>(state: S, action: A) => ({
  ...state,
  error: action.payload,
  status: 'FAILURE',
});

// REDUCER
const authReducer = createReducer<AuthState, AuthAction>(initState, {
  [CHECK_KEYCHAIN]: pending,
  [CHECK_KEYCHAIN_SUCCESS]: success,
  [CHECK_KEYCHAIN_FAILURE]: failure,
  [LOGIN_WITH_FACEBOOK]: pending,
  [LOGIN_WITH_FACEBOOK_SUCCESS]: success,
  [LOGIN_WITH_FACEBOOK_FAILURE]: failure,
  [LOGIN_WITH_GOOGLE]: pending,
  [LOGIN_WITH_GOOGLE_SUCCESS]: success,
  [LOGIN_WITH_GOOGLE_FAILURE]: failure,
});

export default authReducer;
