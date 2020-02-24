import {all, fork} from 'redux-saga/effects';

import authRoot from './auth';
import caseRoot from './case';
import recommendation from './recommendation';

function* rootSaga() {
  yield all([fork(authRoot), fork(caseRoot), fork(recommendation)]);
}

export default rootSaga;
