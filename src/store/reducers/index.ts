import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import caseReducer from './case';
import message from './message';

const rootReducer = combineReducers({
  case: caseReducer,
  message,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
