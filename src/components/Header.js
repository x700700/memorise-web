import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import './Header.scss';
import logo from '../logo.svg';
import consts from "../common/consts";

const Header = (props) => {
    const { t } = useTranslation();
    const error = useSelector(state => state.app.error);
    const userName = useSelector(state => state.app.userName);
    const currPage = useSelector(state => state.app.currentPage);
    const [errorStickerEnded, setErrorStickerEnded] = useState(false);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setErrorStickerEnded(true);
            }, 5000);
        }
    }, [error, setErrorStickerEnded]);

    return (
        <div className="header">
            <div className="header-row">
                <div className="header-left">
                    {userName &&
                    <div className="user-name">
                        {userName}
                    </div>}
                    <button className="btn btn-menu"><i className="fas fa-chevron-down"/></button>
                </div>
                <div className="tabs">
                    <Link to="/"><span className={`btn ${currPage === consts.pageName.trainings ? 'tab-active' : ''}`}><i className="fas fa-book-open"/></span></Link>
                    <Link to="/trainings"><span className={`btn ${currPage === consts.pageName.exercises ? 'tab-active' : ''}`}><i className="fas fa-edit"/></span></Link>
                    <Link to="/practice"><span className={`btn ${currPage === consts.pageName.practice ? 'tab-active' : ''}`}><i className="fas fa-running"/></span></Link>
                </div>
                <img className="logo" src={logo} alt="logo" width="32" height="32"/>
            </div>
            {error && !errorStickerEnded &&
            <div className="error">
                {error}
            </div>}
        </div>
    );
};

export default Header;
