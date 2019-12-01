import React from 'react';
import { useSelector } from 'react-redux'
import './Header.scss';
import logo from '../logo.svg';

const Header = (props) => {
    const error = useSelector(state => state.app.error);
    const userName = useSelector(state => state.app.userName);

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
                    <button className="btn"><i className="fas fa-book-open"/></button>
                    <button className="btn"><i className="fas fa-edit"/></button>
                    <button className="btn"><i className="fas fa-running"/></button>
                </div>
                <img className="logo" src={logo} alt="logo" width="32" height="32"/>
            </div>
            {error &&
            <div>
                {error}
            </div>}
        </div>
    );
};

export default Header;
