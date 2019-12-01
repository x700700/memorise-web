import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import * as types from './redux/actionsTypes';
import { appAuth, setCurrentPage } from './redux/actions/app';
import './Main.scss';
import Game from "./pages/Game";
import Header from "./components/Header";


function Main() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.warn('App started');
        // dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: 'plup' })
        // dispatch(setCurrentPage('olle'));
        dispatch(appAuth());
    }, [dispatch]);

    return (
        <div className="app-main">
            <Header/>
            <Game/>
        </div>
    );
}

export default Main;
