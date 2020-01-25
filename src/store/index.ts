import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import saga from './sagas';

export const configStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(saga);
  return store;
};
