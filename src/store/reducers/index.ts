import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import caseReducer from './case';
import device from './device';
import message from './message';
import recommend from './recommend';

const rootReducer = combineReducers({
  case: caseReducer,
  device,
  message,
  recommend,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
