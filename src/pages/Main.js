import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { appAuth } from '../redux/actions/app';
import './Main.scss';
import Game from './Game';
import Header from '../components/Header';
import NotFound from "./NotFound";
// import * as types from './redux/actionsTypes';


const Main = () => {
    const userName = useSelector(state => state.app.userName);
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
            <Switch>
                <Route exact path="/" component={Game} />
                <Route exact path="/practice" component={Game} />
                <Route path="/practice/:id" component={Game} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};
export default Main;
