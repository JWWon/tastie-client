import {createReducer} from 'typesafe-actions';

import {copyPayload} from '@utils/helper';
import {DeviceAction, UPDATE_HOME_HEIGHT} from '../actions/device';

export interface DeviceState {
  homeHeight: number;
}

const initState: DeviceState = {
  homeHeight: 720,
};

const deviceReducer = createReducer<DeviceState, DeviceAction>(initState, {
  [UPDATE_HOME_HEIGHT]: copyPayload,
});

export default deviceReducer;
