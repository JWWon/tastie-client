import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILURE,
} from './../actions/auth';
import {createReducer} from 'typesafe-actions';

import {setPendingWithLoading} from '@utils/helper';
import {TypeInterface} from '@services/auth';
import {CoordsInterface} from '@store/reducers/case';
import {
  AuthAction,
  CHECK_KEYCHAIN,
  CHECK_KEYCHAIN_SUCCESS,
  CHECK_KEYCHAIN_FAILURE,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  LOGIN_WITH_FACEBOOK_FAILURE,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_GOOGLE_SUCCESS,
  LOGIN_WITH_GOOGLE_FAILURE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
  LOGOUT,
} from '@store/actions/auth';

export interface AuthInterface {
  type: TypeInterface;
  name: string;
  email: string;
  birthYear?: string;
}

interface AuthState extends AuthInterface {
  loading: boolean;
  status: 'PENDING' | 'NO_USER' | 'USER_EXIST';
  userCoords: CoordsInterface;
  error?: any;
}

const initState: AuthState = {
  loading: false,
  status: 'PENDING',
  // USER INTERFACE
  type: 'email',
  name: '',
  email: '',
  // USER INFO FROM SERVICE
  userCoords: {latitude: 0, longitude: 0},
};

// HELPERS
const setSuccessWithUser = <A extends {payload: any}>(
  state: AuthState,
  action: A,
): AuthState => ({
  ...state,
  ...action.payload,
  loading: false,
  status: 'USER_EXIST',
});

const setFailureWithoutUser = <A extends {payload: any}>(
  state: AuthState,
  action: A,
): AuthState => ({
  ...state,
  error: action.payload,
  loading: false,
  status: 'NO_USER',
});

// REDUCER
const authReducer = createReducer<AuthState, AuthAction>(initState, {
  // ASYNC
  [CHECK_KEYCHAIN]: setPendingWithLoading,
  [CHECK_KEYCHAIN_SUCCESS]: setSuccessWithUser,
  [CHECK_KEYCHAIN_FAILURE]: setFailureWithoutUser,
  [LOGIN_WITH_FACEBOOK]: setPendingWithLoading,
  [LOGIN_WITH_FACEBOOK_SUCCESS]: setSuccessWithUser,
  [LOGIN_WITH_FACEBOOK_FAILURE]: setFailureWithoutUser,
  [LOGIN_WITH_GOOGLE]: setPendingWithLoading,
  [LOGIN_WITH_GOOGLE_SUCCESS]: setSuccessWithUser,
  [LOGIN_WITH_GOOGLE_FAILURE]: setFailureWithoutUser,
  [LOGIN_WITH_EMAIL]: setPendingWithLoading,
  [LOGIN_WITH_EMAIL_SUCCESS]: setSuccessWithUser,
  [LOGIN_WITH_EMAIL_FAILURE]: setFailureWithoutUser,
  [SIGNUP]: setPendingWithLoading,
  [SIGNUP_SUCCESS]: setSuccessWithUser,
  [SIGNUP_FAILURE]: setFailureWithoutUser,
  [GET_USER_COORDS_SUCCESS]: (state, action) => ({
    ...state,
    userCoords: action.payload,
  }),
  [GET_USER_COORDS_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  // SYNC
  [LOGOUT]: () => ({...initState, status: 'NO_USER'}),
});

export default authReducer;
