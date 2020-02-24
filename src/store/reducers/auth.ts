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

export interface UserInterface {
  provider: 'facebook' | 'google' | 'email';
  accessToken: string | null;
  name: string;
  email: string;
  birthYear?: string;
}

interface AuthState extends UserInterface {
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

const authReducer = createReducer<AuthState, AuthAction>(initState, {
  [CHECK_KEYCHAIN]: state => ({...state, status: 'PENDING', error: undefined}),
  [CHECK_KEYCHAIN_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    status: 'SUCCESS',
  }),
  [CHECK_KEYCHAIN_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
    status: 'FAILURE',
  }),
  [LOGIN_WITH_FACEBOOK]: state => ({
    ...state,
    status: 'PENDING',
    error: undefined,
  }),
  [LOGIN_WITH_FACEBOOK_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    status: 'SUCCESS',
  }),
  [LOGIN_WITH_FACEBOOK_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
    status: 'FAILURE',
  }),
});

export default authReducer;
