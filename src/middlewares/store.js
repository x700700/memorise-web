import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger'
import reducers from '../redux/store';
import middleware from './saga';

let reduxDevtoolsExtension;
if (process.env.NODE_ENV !== 'production') {
    reduxDevtoolsExtension = require('redux-devtools-extension');
}

const logger = createLogger({
    collapsed: true,
});

export default createStore(
    combineReducers({
        ...reducers,
        form: formReducer
    }),
    process.env.NODE_ENV !== 'production' ?
        reduxDevtoolsExtension.composeWithDevTools(applyMiddleware(...middleware, logger)) :
        applyMiddleware(...middleware)
);
