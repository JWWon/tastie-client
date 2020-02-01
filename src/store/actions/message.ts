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

// UPDATE_HIDE
interface UpdateHide {
  hide: boolean;
}

export const UPDATE_HIDE = '@message/UPDATE_HIDE';

export const updateHide = createAction(
  UPDATE_HIDE,
  (payload: UpdateHide) => payload,
)();
// END UPDATE_HIDE

// DELETE_PRESS_ACTION
export const DELETE_PRESS_ACTION = '@message/DELETE_PRESS_ACTION';

export const deletePressAction = createAction(
  DELETE_PRESS_ACTION,
  () => undefined,
)();
// END DELETE_PRESS_ACTION

const actions = {
  updateContent,
  updateLoading,
  updateHide,
  deletePressAction,
};
export type MessageAction = ActionType<typeof actions>;
