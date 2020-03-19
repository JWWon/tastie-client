import {all, fork} from 'redux-saga/effects';

import authRoot from './auth';
import caseRoot from './case';
import historyRoot from './history';
import recommendations from './recommendations';

function* rootSaga() {
  yield all([
    fork(authRoot),
    fork(caseRoot),
    fork(historyRoot),
    fork(recommendations),
  ]);
}

export default rootSaga;
