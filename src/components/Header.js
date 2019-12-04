import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as types from '../redux/actionsTypes';
import './Header.scss';
import logo from '../logo.svg';
import consts from "../common/consts";
import MenuGame from "./Practice/MenuGame";
import MenuExam from "./Practice/MenuExam";

const Header = (props) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.app.error);
    const currPage = useSelector(state => state.app.currentPage);
    const [timingCurrPage, setTimingCurrPage] = useState(currPage);
    const [errorStickerEnded, setErrorStickerEnded] = useState(false);

    const appShowMenu = useSelector(state => state.app.showMenu);
    const [showMenu, setShowMenu] = useState(appShowMenu);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setErrorStickerEnded(true);
            }, 5000);
        }
    }, [error, setErrorStickerEnded]);

    useEffect(() => {
        if (appShowMenu) {
            setTimingCurrPage(currPage);
        } else {
            // So when switching tab when menu is on - It goes up with the old tab menu and not new one:
            setTimeout(() => {
                setTimingCurrPage(currPage);
            }, 300);
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
    };

    const isMenuBtnDisable = showMenu !== appShowMenu;
    return (
        <div className="header">
            <div className="header-row">
                <div className="header-left">
                    {!showMenu &&
                    <button onClick={() => menuClicked(true)} className={`btn btn-menu ${isMenuBtnDisable ? 'disable-pointer' : ''}`}><i className="fas fa-chevron-down"/></button>
                    }
                    {showMenu &&
                    <button onClick={() => menuClicked(false)} className={`btn btn-menu ${isMenuBtnDisable ? 'disable-pointer' : ''}`}><i className="fas fa-chevron-up"/></button>
                    }
                </div>
                <div className="tabs">
                    <Link to="/"><span className={`btn ${currPage === consts.pageName.trainings ? 'tab-active' : ''}`}><i className="fas fa-book-open"/></span></Link>
                    <Link to="/trainings"><span className={`btn ${currPage === consts.pageName.exercises ? 'tab-active' : ''}`}><i className="fas fa-edit"/></span></Link>
                    <Link to="/practice"><span className={`btn ${currPage === consts.pageName.practice ? 'tab-active' : ''}`}><i className="fas fa-running"/></span></Link>
                    <Link to="/exam"><span className={`btn ${currPage === consts.pageName.exam ? 'tab-active' : ''}`}><i className="fas fa-grin-beam-sweat"/></span></Link>
                </div>
                <img className="logo" src={logo} alt="logo" width="32" height="32" onClick={() => clearLocalStorage()}/>
            </div>
            <div id="top-header-menu" className={`top-menu-box ${appShowMenu ? 'top-menu-pop-down' : ''}`}>
                <div className="menu-container">
                    <MenuGame hide={timingCurrPage !== consts.pageName.practice}/>
                    <MenuExam hide={timingCurrPage !== consts.pageName.exam}/>
                </div>
            </div>
            {error && !errorStickerEnded &&
            <div className="error">
                {error}
            </div>}
        </div>
    );
};

export default Header;
