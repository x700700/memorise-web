import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { appAuth } from '../redux/actions/app';
import './Main.scss';
import Header from '../components/Header';
import NotFound from "./NotFound";
import Game from './Game';
import Exam from "./Exam";


const Main = () => {
    const userName = useSelector(state => state.app.userName);
    const authCheckStarted = useSelector(state => state.app.authCheckStarted);
    const authCheckEnded = useSelector(state => state.app.authCheckEnded);

    const dispatch = useDispatch();
    useEffect(() => {
        console.warn('App started');
        dispatch(appAuth());
    }, [dispatch]);

    useEffect(() => {
        authCheckStarted && authCheckEnded && userName && console.warn(`*** Hello ${userName} ***`);
        authCheckStarted && authCheckEnded && !userName && console.warn(`*** Not Signed In ***`);
    }, [userName, authCheckEnded, authCheckStarted]);

    return (
        <div className="app-main">
            <Header/>
            <Switch>
                <Route exact path="/"><Redirect to="/practice" /></Route>
                <Route path="/trainings/:id" component={null} />
                <Route exact path="/practice" component={Game} />
                <Route exact path="/exam" component={Exam} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};
export default Main;
