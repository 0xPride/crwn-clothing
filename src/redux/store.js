import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { createSagaMiddleware } from 'redux-saga';

import rootSaga from './root-saga';

import rootReducer from './root-reducer';

const sagaMidlleware = createSagaMiddleware();

const middlewares = [sagaMidlleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMidlleware.run(rootSaga);

export const persistor = persistStore(store);
