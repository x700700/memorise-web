import React from 'react';
import './Header.scss';

function Header() {
    return (
        <div className="header">
            <div className="header-row">
                <div className="tab-container">Trainings</div>
                <div className="tab-container">Exercises</div>
                <div className="tab-container">Train</div>
                <div className="tab-container">Test</div>
            </div>
        </div>
    );
}

export default Header;
