import React, {useEffect} from 'react';
import './Main.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from "react-i18next";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import logger from '../common/logger';
import * as types from '../redux/actionsTypes';
import { appAuth } from '../redux/actions';
import Header from '../components/Main/Header';
import Game from './Game';
import Exam from "./Exam";
import TrainingsList from "./TrainingsList";
import EditTraining from "./EditTraining";
import NotFound from "./NotFound";
import Login from "./Login";


const theme = createMuiTheme({
        palette: {
            primary: green,
            secondary: red,
        }
    },
);

let _activeDrawerTrainingId = null;
const Main = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const loggedInUsername = useSelector(state => state.app.userName);
    const authCheckStarted = useSelector(state => state.app.authCheckStarted);
    const authCheckEnded = useSelector(state => state.app.authCheckEnded);
    const isMenuShown = useSelector(state => state.app.showMenu);
    const activeDrawerTrainingId = useSelector(state => state.app.activeDrawerTrainingId);

    useEffect(() => {
        _activeDrawerTrainingId = activeDrawerTrainingId;
    }, [activeDrawerTrainingId]);

    useEffect(() => {
        const handleScroll = (e) => {
            // logger.warn('scroling.........');
            _activeDrawerTrainingId && dispatch({ type: types.APP_SET_ACTIVE_DRAWER_TRAINING, id: null });
        };

        logger.warn('App started');
        dispatch(appAuth({
            authErrorMessage: t('err-auth'),
            signinErrorMessage: t('err-signin'),
            signupErrorMessage: t('err-signup'),
            friendErrorMessage: t('err-friend-not-found'),
        }));

        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.addEventListener('scroll', handleScroll, false);
        }
    }, [dispatch, t]);

    useEffect(() => {
        authCheckStarted && authCheckEnded && loggedInUsername && logger.warn('*** Hello', loggedInUsername + ' ***');
        authCheckStarted && authCheckEnded && !loggedInUsername && logger.warn(`*** Not Signed In ***`);
    }, [loggedInUsername, authCheckEnded, authCheckStarted]);


    const onBodyClick = (e) => {
        // logger.warn('============>', e.target, e.target.id, e.target.className);
        const isActive = e.target.id === 'active' || e.target.className.includes('active');
        if (!isActive && activeDrawerTrainingId) {
            dispatch({ type: types.APP_SET_ACTIVE_DRAWER_TRAINING, id: null });
        }

        isMenuShown && dispatch({type: types.APP_SHOW_MENU, show: false});
    };

    return (
        <MuiThemeProvider theme={theme}>
            <div className="app-main">
                <div className="header-space-holder" style={{minHeight: '53px'}}></div>
                <Header/>
                <div className="app-body-area" onClick={onBodyClick}>
                    <Switch>
                        <Route exact path="/"><Redirect to="/practice"/></Route>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/trainings" component={TrainingsList}/>
                        <Route path="/trainings/:id/edit" component={EditTraining}/>
                        <Route exact path="/practice" component={Game}/>
                        <Route exact path="/exam" component={Exam}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </div>
        </MuiThemeProvider>
    );
};
export default Main;
