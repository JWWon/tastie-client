import {all, fork} from 'redux-saga/effects';

import caseRoot from './case';
import recommendation from './recommendation';

function* rootSaga() {
  yield all([fork(caseRoot), fork(recommendation)]);
}

export default rootSaga;
