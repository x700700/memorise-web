import React from 'react';
import './TopMenu.scss';

const TopMenu = ({ children, hide }) => {
    return (
        <div className={`top-menu-container ${hide ? 'hide' : ''}`}>
            <div className="menu-container">
                <div className="menu-box">
                    {children}
                </div>
            </div>
        </div>
    );
};
export default TopMenu;
