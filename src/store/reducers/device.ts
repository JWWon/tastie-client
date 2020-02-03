import {createReducer} from 'typesafe-actions';

import {copyPayload} from '@utils/helper';
import {
  DeviceAction,
  UPDATE_HOME_HEIGHT,
  UPDATE_MESSAGE_HEIGHT,
} from '../actions/device';

export interface DeviceState {
  homeHeight: number;
  messageHeight: number;
}

const initState: DeviceState = {
  homeHeight: 720,
  messageHeight: 57, // iPhone 10
};

const deviceReducer = createReducer<DeviceState, DeviceAction>(initState, {
  [UPDATE_HOME_HEIGHT]: copyPayload,
  [UPDATE_MESSAGE_HEIGHT]: copyPayload,
});

export default deviceReducer;
