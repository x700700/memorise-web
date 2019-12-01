import React from 'react';
import { Provider } from 'react-redux'
import './App.scss';
import Game from "./pages/Game";
import Header from "./components/Header";

import store from './redux/store';
import saga from './redux/sagas';
import { sagaMiddleware } from './middlewares/saga';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Header/>
                <Game/>
            </div>
        </Provider>
    );
}

export default App;

sagaMiddleware.run(saga);
