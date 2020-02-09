import {all, fork} from 'redux-saga/effects';

import caseRoot from './case';
import recommend from './recommend';

function* rootSaga() {
  yield all([fork(caseRoot), fork(recommend)]);
}

export default rootSaga;
