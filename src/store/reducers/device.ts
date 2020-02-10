import {createReducer} from 'typesafe-actions';

import {copyPayload} from '@utils/helper';
import {
  DeviceAction,
  UPDATE_HOME_HEIGHT,
  UPDATE_MESSAGE_HEIGHT,
  UPDATE_KEYBOARD_VISIBLE,
} from '../actions/device';

export interface DeviceState {
  homeHeight: number;
  messageHeight: number;
  keyboardVisible: boolean;
}

const initState: DeviceState = {
  homeHeight: 720,
  messageHeight: 57, // iPhone 10
  keyboardVisible: false,
};

const deviceReducer = createReducer<DeviceState, DeviceAction>(initState, {
  [UPDATE_HOME_HEIGHT]: copyPayload,
  [UPDATE_MESSAGE_HEIGHT]: copyPayload,
  [UPDATE_KEYBOARD_VISIBLE]: copyPayload,
});

export default deviceReducer;
