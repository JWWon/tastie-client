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

const actions = {
  updateHomeHeight,
};
export type DeviceAction = ActionType<typeof actions>;
