import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import {persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middleware/logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';



const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

  

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};
const sagaMiddlerware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger,sagaMiddlerware].filter(
  Boolean
);
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddlerware.run(rootSaga);
export const persistor = persistStore(store);