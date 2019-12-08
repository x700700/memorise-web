import React from "react";
import './PlusButton.scss';

const PlusButton = ({ size }) => {

    const styleBg = {
        width: `${size}rem`,
        height: `${size}rem`,
    };

    const styleIcon = {
        fontSize: `${size}rem`,
        fontWeight: '300',
    };

    return (
        <div className="plus-button-container">
            <div className="btn-bg" style={styleBg}>
            </div>
            <div className="btn-icon" style={styleIcon}>
                +
            </div>
        </div>);
};
export default PlusButton;
