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
    // const { t } = useTranslation();
    const error = useSelector(state => state.app.error);
    // const userName = useSelector(state => state.app.userName);
    const currPage = useSelector(state => state.app.currentPage);
    const showMenu = useSelector(state => state.app.showMenu);
    const [errorStickerEnded, setErrorStickerEnded] = useState(false);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setErrorStickerEnded(true);
            }, 5000);
        }
    }, [error, setErrorStickerEnded]);

    const setShowMenu = (show) => {
        dispatch({ type: types.APP_SHOW_MENU, show: show });
    };

    return (
        <div className="header">
            <div className="header-row">
                <div className="header-left">
                    {!showMenu &&
                    <button onClick={() => setShowMenu(true)} className="btn btn-menu"><i className="fas fa-chevron-down"/></button>
                    }
                    {showMenu &&
                    <button onClick={() => setShowMenu(false)} className="btn btn-menu"><i className="fas fa-chevron-up"/></button>
                    }
                </div>
                <div className="tabs">
                    <Link to="/"><span className={`btn ${currPage === consts.pageName.trainings ? 'tab-active' : ''}`}><i className="fas fa-book-open"/></span></Link>
                    <Link to="/trainings"><span className={`btn ${currPage === consts.pageName.exercises ? 'tab-active' : ''}`}><i className="fas fa-edit"/></span></Link>
                    <Link to="/practice"><span className={`btn ${currPage === consts.pageName.practice ? 'tab-active' : ''}`}><i className="fas fa-running"/></span></Link>
                    <Link to="/exam"><span className={`btn ${currPage === consts.pageName.exam ? 'tab-active' : ''}`}><i className="fas fa-grin-beam-sweat"/></span></Link>
                </div>
                <img className="logo" src={logo} alt="logo" width="32" height="32"/>
            </div>
            <div className={`top-menu-box ${showMenu ? 'top-menu-pop-down' : ''}`}>
                <div className="menu-container">
                    {currPage === consts.pageName.practice &&
                    <MenuGame/>
                    }
                    {currPage === consts.pageName.exam &&
                    <MenuExam/>
                    }
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
