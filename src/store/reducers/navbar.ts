import {createReducer} from 'typesafe-actions';

import {
  NavbarAction,
  UPDATE_MESSAGE,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SHOW_LOADING,
  HIDE_LOADING,
  CLEAR_ACTION,
  EXPAND_NAVBAR,
  CLEAR_NAVBAR,
  UPDATE_SCREEN_NAME,
  CONTRACT_NAVBAR,
} from '../actions/navbar';

export interface NavbarState {
  loading: boolean;
  expand: boolean;
  // message
  message: string;
  showMessage: boolean;
  // message와 연관된 특별한 action
  customAction?: () => void;
  // other
  screenName: string;
}

const initState: NavbarState = {
  loading: false,
  expand: false,
  message: '배고프나옹?',
  showMessage: true,
  screenName: '',
};

const navbarReducer = createReducer<NavbarState, NavbarAction>(initState, {
  [UPDATE_MESSAGE]: (state, action) => ({
    ...state,
    ...action.payload,
    loading: false,
    showMessage: true,
  }),
  [UPDATE_SCREEN_NAME]: (state, action) => ({
    ...state,
    screenName: action.payload,
  }),
  [SHOW_MESSAGE]: state => ({...state, showMessage: true}),
  [HIDE_MESSAGE]: state => ({...state, showMessage: false}),
  [SHOW_LOADING]: state => ({...state, loading: true}),
  [HIDE_LOADING]: state => ({...state, loading: false}),
  [EXPAND_NAVBAR]: state => ({...state, expand: true, showMessage: false}),
  [CONTRACT_NAVBAR]: state => ({...state, expand: false, showMessage: true}),
  [CLEAR_ACTION]: state => ({...state, customAction: undefined}),
  [CLEAR_NAVBAR]: () => initState,
});

export default navbarReducer;
