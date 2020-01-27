import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import situation from './situation';

const rootReducer = combineReducers({
  situation,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
