import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { appAuth } from './redux/actions/app';
// import * as types from './redux/actionsTypes';
import './Main.scss';
import Game from "./pages/Game";
import Header from "./components/Header";


function Main() {
    const userName = useSelector(state => state.app.name);
    const authCheckStarted = useSelector(state => state.app.authCheckStarted);
    const authCheckEnded = useSelector(state => state.app.authCheckEnded);

    const dispatch = useDispatch();
    useEffect(() => {
        console.warn('App started');
        // dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: 'plup' })
        // dispatch(setCurrentPage('olle'));
        dispatch(appAuth());
    }, [dispatch]);

    useEffect(() => {
        authCheckStarted && authCheckEnded && console.warn(`*** Hello ${userName} ***`);
    }, [userName, authCheckEnded, authCheckStarted]);

    return (
        <div className="app-main">
            <Header/>
            <Game/>
        </div>
    );
}

export default Main;
