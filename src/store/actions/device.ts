import {createAction, ActionType} from 'typesafe-actions';

// UPDATE_HOME_HEIGHT
interface UpdateHomeHeight {
  homeHeight: number;
}

export const UPDATE_HOME_HEIGHT = '@device/UPDATE_HOME_HEIGHT';

export const updateHomeHeight = createAction(
  UPDATE_HOME_HEIGHT,
  (payload: UpdateHomeHeight) => payload,
)();
// END UPDATE_HOME_HEIGHT

// UPDATE_MESSAGE_HEIGHT
interface UpdateMessageHeight {
  messageHeight: number;
}

export const UPDATE_MESSAGE_HEIGHT = '@device/UPDATE_MESSAGE_HEIGHT';

export const updateMessageHeight = createAction(
  UPDATE_MESSAGE_HEIGHT,
  (payload: UpdateMessageHeight) => payload,
)();
// END UPDATE_MESSAGE_HEIGHT

// UPDATE_KEYBOARD_VISIBLE
interface UpdateKeyboardVisible {
  keyboardVisible: boolean;
}

export const UPDATE_KEYBOARD_VISIBLE = '@device/UPDATE_KEYBOARD_VISIBLE';

export const updateKeyboardVisible = createAction(
  UPDATE_KEYBOARD_VISIBLE,
  (payload: UpdateKeyboardVisible) => payload,
)();
// UPDATE_KEYBOARD_VISIBLE

const actions = {
  updateHomeHeight,
  updateMessageHeight,
  updateKeyboardVisible,
};
export type DeviceAction = ActionType<typeof actions>;
