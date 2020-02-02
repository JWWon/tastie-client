import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import caseReducer from './case';
import device from './device';
import message from './message';

const rootReducer = combineReducers({
  case: caseReducer,
  device,
  message,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
