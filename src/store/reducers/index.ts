import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import auth from './auth';
import caseReducer from './case';
import device from './device';
import recommendation from './recommendation';
import navbar from './navbar';

const rootReducer = combineReducers({
  auth,
  case: caseReducer,
  device,
  recommendation,
  navbar,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
