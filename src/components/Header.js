import React from 'react';
// import { useSelector } from 'react-redux'
import './Header.scss';
import logo from '../logo.svg';

const Header = (props) => {
    // const tabName = useSelector(state => state.app.currentPage);

    return (
        <div className="header">
            <div className="header-row">
                <button className="btn btn-menu"><i className="fas fa-chevron-down"/></button>
                <div className="tabs">
                    <button className="btn"><i className="fas fa-book-open"/></button>
                    <button className="btn"><i className="fas fa-edit"/></button>
                    <button className="btn"><i className="fas fa-running"/></button>
                </div>
                <img className="logo" src={logo} alt="logo" width="32" height="32"/>
            </div>
        </div>
    );
};

export default Header;
