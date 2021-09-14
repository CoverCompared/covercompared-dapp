/* eslint-disable global-require */
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import rootSaga from '../sagas/index';
import rootReducers from '../reducers/index';

const config = {
  key: 'root',
  storage,
  whitelist: ['auth', 'app'],
  // debug: true //to get useful logging
};
const history = createBrowserHistory();
const middleware = [];
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
middleware.push(sagaMiddleware);
middleware.push(routeMiddleware);

const reducers = persistCombineReducers(config, rootReducers(history));
const enhancers = [applyMiddleware(...middleware)];
let composeEnhancers;
if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose;
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistConfig = { enhancers };
const configureStore = () => {
  const store = createStore(reducers, undefined, composeEnhancers(applyMiddleware(...middleware)));

  const persistor = persistStore(store, persistConfig, () => {});

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return { persistor, store };
};

export default configureStore;

export { history };
