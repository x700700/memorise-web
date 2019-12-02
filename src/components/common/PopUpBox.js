import React from 'react';
import './PopUpBox.scss';

const PopUpBox = (props) => {
    const { show } = props;

    return (
        <div className={`popup-box-container ${show ? 'popup-box-popup' : ''}`}>
            {props.children}
        </div>
    );
};

export default PopUpBox;
