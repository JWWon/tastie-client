import {createAction, ActionType} from 'typesafe-actions';

// UPDATE_MESSAGE
interface UpdateMessage {
  message: string;
  customAction?: () => void;
}

export const UPDATE_MESSAGE = '@navbar/UPDATE_MESSAGE';

export const updateMessage = createAction(
  UPDATE_MESSAGE,
  (payload: UpdateMessage) => payload,
)();
// END UPDATE_MESSAGE

// SHOW_MESSAGE
export const SHOW_MESSAGE = '@navbar/SHOW_MESSAGE';

export const showMessage = createAction(SHOW_MESSAGE)();
// END SHOW_MESSAGE

// HIDE_MESSAGE
export const HIDE_MESSAGE = '@navbar/HIDE_MESSAGE';

export const hideMessage = createAction(HIDE_MESSAGE)();
// END HIDE_MESSAGE

// SHOW_LOADING
export const SHOW_LOADING = '@navbar/SHOW_LOADING';

export const showLoading = createAction(SHOW_LOADING)();
// END SHOW_LOADING

// HIDE_LOADING
export const HIDE_LOADING = '@navbar/HIDE_LOADING';

export const hideLoading = createAction(HIDE_LOADING)();
// END HIDE_LOADING

// EXPAND_NAVBAR
export const EXPAND_NAVBAR = '@navbar/EXPAND_NAVBAR';

export const expandNavbar = createAction(EXPAND_NAVBAR)();
// END EXPAND_NAVBAR

// CONTRACT_NAVBAR
export const CONTRACT_NAVBAR = '@navbar/CONTRACT_NAVBAR';

export const contractNavbar = createAction(CONTRACT_NAVBAR)();
// END CONTRACT_NAVBAR

// CLEAR_ACTION
export const CLEAR_ACTION = '@navbar/CLEAR_ACTION';

export const clearAction = createAction(CLEAR_ACTION)();
// END CLEAR_ACTION

// CLEAR_NAVBAR
export const CLEAR_NAVBAR = '@navbar/CLEAR_NAVBAR';

export const clearNavbar = createAction(CLEAR_NAVBAR)();
// END CLEAR_NAVBAR

// UPDATE_SCREEN_NAME
export const UPDATE_SCREEN_NAME = '@navbar/UPDATE_SCREEN_NAME';

export const updateScreenName = createAction(
  UPDATE_SCREEN_NAME,
  (payload: string) => payload,
)();
// END UPDATE_SCREEN_NAME

const actions = {
  updateMessage,
  updateScreenName,
  showMessage,
  hideMessage,
  showLoading,
  hideLoading,
  expandNavbar,
  contractNavbar,
  clearAction,
  clearNavbar,
};

export type NavbarAction = ActionType<typeof actions>;
