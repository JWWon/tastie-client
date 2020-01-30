import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import caseReducer from './case';

const rootReducer = combineReducers({
  case: caseReducer,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
