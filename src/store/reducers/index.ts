import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import caseReducer from './case';
import device from './device';
import message from './message';
import recommendation from './recommendation';

const rootReducer = combineReducers({
  case: caseReducer,
  device,
  message,
  recommendation,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
