import {
  CHECK_KEYCHAIN_FAILURE,
  CHECK_KEYCHAIN_SUCCESS,
} from './../actions/auth';
import {createReducer} from 'typesafe-actions';

import {AuthAction, CHECK_KEYCHAIN} from '../actions/auth';

export interface UserInterface {
  name: string;
  birth?: string;
}

interface AuthState extends UserInterface {
  provider: 'facebook' | 'google' | 'email';
  token: string | null;
  status: 'PENDING' | 'SUCCESS' | 'FAILURE';
  error?: any;
}

const initState: AuthState = {
  provider: 'email',
  token: null,
  status: 'PENDING',
  // user interface
  name: '',
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
});

export default authReducer;
