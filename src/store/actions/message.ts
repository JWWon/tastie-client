import {createAction, ActionType} from 'typesafe-actions';

// UPDATE_CONTENT
interface UpdateContent {
  content: string;
  onPress?: () => void;
}

export const UPDATE_CONTENT = '@message/UPDATE_CONTENT';

export const updateContent = createAction(
  UPDATE_CONTENT,
  (payload: UpdateContent) => payload,
)();
// END UPDATE_CONTENT

// UPDATE_LOADING
interface UpdateLoading {
  loading: boolean;
}

export const UPDATE_LOADING = '@message/UPDATE_LOADING';

export const updateLoading = createAction(
  UPDATE_LOADING,
  (payload: UpdateLoading) => payload,
)();
// END UPDATE_LOADING

// HIDE_MESSAGE
export const HIDE_MESSAGE = '@message/HIDE_MESSAGE';

export const hideMessage = createAction(HIDE_MESSAGE, () => undefined)();
// END HIDE_MESSAGE

// RESET_PRESS_ACTION
export const RESET_PRESS_ACTION = '@message/RESET_PRESS_ACTION';

export const resetPressAction = createAction(
  RESET_PRESS_ACTION,
  () => undefined,
)();
// END RESET_PRESS_ACTION

const actions = {
  updateContent,
  updateLoading,
  hideMessage,
  resetPressAction,
};
export type MessageAction = ActionType<typeof actions>;
