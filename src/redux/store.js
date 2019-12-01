import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import logger from 'redux-logger';

import reducers from './reducers';
import middleware from '../middlewares/saga';

export default createStore(
    combineReducers({
        ...reducers,
        form: formReducer
    }),
    composeWithDevTools(applyMiddleware(...middleware, logger))
);
