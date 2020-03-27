import {all, fork} from 'redux-saga/effects';

import authRoot from './auth';
import caseRoot from './case';
import discoveriesRoot from './discoveries';
import historyRoot from './history';

function* rootSaga() {
  yield all([
    fork(authRoot),
    fork(caseRoot),
    fork(historyRoot),
    fork(discoveriesRoot),
  ]);
}

export default rootSaga;
