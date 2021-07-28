import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { persistMiddleware } from './middleware/persist-middleware';
import reducers from './reducers';

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

middleware.push(thunk, persistMiddleware);

export const store = createStore(reducers, {}, applyMiddleware(...middleware));
