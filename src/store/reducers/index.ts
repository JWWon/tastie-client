import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import auth from './auth';
import caseReducer from './case';
import device from './device';
import recommendations from './recommendations';
import navbar from './navbar';

const rootReducer = combineReducers({
  auth,
  case: caseReducer,
  device,
  recommendations,
  navbar,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
