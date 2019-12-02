import React from 'react';
import './TopMenu.scss';

const TopMenu = (props) => {
    return (
        <div className="menu-container">
            <div className="menu-box">
                {props.children}
            </div>
        </div>
    );
};
export default TopMenu;
