import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger'
import reducers from './reducers';
import middleware from '../middlewares/saga';

const logger = createLogger({
    collapsed: true,
});

export default createStore(
    combineReducers({
        ...reducers,
        form: formReducer
    }),
    composeWithDevTools(applyMiddleware(...middleware, logger))
);
