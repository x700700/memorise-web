import React, {useCallback, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as types from '../redux/actionsTypes';
import './Header.scss';
import logo from '../logo.svg';
import consts from "../common/consts";
import MenuGame from "./Practice/MenuGame";
import MenuExam from "./Practice/MenuExam";
import {useTranslation} from "react-i18next";
import AddButton from "./AddButton";
import MenuEdit from "./EditTraining/MenuEdit";

const Header = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const error = useSelector(state => state.app.error);
    const training = useSelector(state => state.editTraining.training);
    const currPage = useSelector(state => state.app.currentPage);
    const trainingNameIsOnEdit = useSelector(state => state.app.trainingNameIsOnEdit);
    const [timingCurrPage, setTimingCurrPage] = useState(currPage);
    const appShowMenu = useSelector(state => state.app.showMenu);
    const [showMenu, setShowMenu] = useState(appShowMenu);

    const editTrainingId = (training && training.id) || 'NotFound';

    const clearError = useCallback(() => dispatch({ type: types.APP_SET_ERROR, error: null }), [dispatch]);
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                clearError();
            }, 5000);
        }
    }, [error, clearError]);

    useEffect(() => {
        if (appShowMenu) {
            setTimingCurrPage(currPage);
        } else {
            // So when switching tab when menu is on - It goes up with the old tab menu and not new one:
            setTimeout(() => {
                setTimingCurrPage(currPage);
            }, 600);
        }
    }, [currPage, appShowMenu]);

    useEffect(() => {
        const menuTransEnded = () => {
            setShowMenu(appShowMenu);
        };
        document.getElementById("top-header-menu").addEventListener("transitionend", menuTransEnded);
        return () => {
            document.getElementById("top-header-menu").removeEventListener("transitionend", menuTransEnded);
        }
    }, [setShowMenu, appShowMenu]);

    const menuClicked = (show) => {
        dispatch({ type: types.APP_SHOW_MENU, show: show });
    };

    const clearLocalStorage = () => {
        console.warn('Clearing localStorage.');
        localStorage.removeItem(consts.localStorage.gameId);
        localStorage.removeItem(consts.localStorage.examId);
        dispatch({type: types.APP_SET_ERROR, error: t('Local storage was cleaned')});
    };

    const styleOnEdit = {
        pointerEvents: trainingNameIsOnEdit ? 'none' : 'auto',
    };

    const isMenuBtnDisable = showMenu !== appShowMenu;
    const menuBtnStatusClass = appShowMenu ? 'btn-menu-opened' : '';
    return (
        <div className="header">
            <div className="header-row">
                <div className="header-left" style={styleOnEdit}>
                    <button onClick={() => menuClicked(!appShowMenu)} className={`btn btn-menu ${isMenuBtnDisable ? 'disable-pointer' : ''}`}><i className={`fas fa-chevron-down ${menuBtnStatusClass}`}/></button>
                </div>
                <div className="tabs" style={styleOnEdit}>
                    <Link to="/trainings"><span className={`btn ${currPage === consts.pageName.trainings ? 'tab-active' : ''}`}><i className="fas fa-book-open"/></span></Link>
                    <Link to={`/trainings/${editTrainingId}/edit`}><span className={`btn ${currPage === consts.pageName.edit ? 'tab-active' : ''}`}><i className="fas fa-edit"/></span></Link>
                    <Link to="/practice"><span className={`btn ${currPage === consts.pageName.practice ? 'tab-active' : ''}`}><i className="fas fa-copy"/></span></Link>
                    <Link to="/exam"><span className={`btn ${currPage === consts.pageName.exam ? 'tab-active' : ''}`}><i className="fas fa-grin-beam-sweat"/></span></Link>
                </div>
                <img className="logo" style={styleOnEdit} src={logo} alt="logo" width="32" height="32" onClick={() => clearLocalStorage()}/>
            </div>
            <div id="top-header-menu" className={`top-menu-box ${appShowMenu ? 'top-menu-pop-down' : ''}`}>
                <div className="menu-container">
                    <MenuEdit hide={timingCurrPage !== consts.pageName.edit}/>
                    <MenuGame hide={timingCurrPage !== consts.pageName.practice}/>
                    <MenuExam hide={timingCurrPage !== consts.pageName.exam}/>
                </div>
            </div>
            <div className="add-btn-box" style={styleOnEdit}>
                <AddButton/>
            </div>
            {error &&
            <div className="error">
                {error}
            </div>}
        </div>
    );
};

export default Header;
