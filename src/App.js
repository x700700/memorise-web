import React from 'react';
import { Provider } from 'react-redux'
import store from './middlewares/store';
import saga from './redux/sagas';
import { sagaMiddleware } from './middlewares/saga';

import './App.scss';
import Main from "./Main";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Main/>
            </div>
        </Provider>
    );
}
export default App;

sagaMiddleware.run(saga);
