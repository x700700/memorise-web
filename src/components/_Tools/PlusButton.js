import React from "react";
import './PlusButton.scss';

const PlusButton = ({ faName, size, hide, onClick, color, backgroundColor }) => {

    const styleBg = {
        width: `${size}rem`,
        height: `${size}rem`,
    };

    const styleIcon = {
        fontSize: `${size}rem`,
        fontWeight: '300',
        color: `#${color}`,
        backgroundColor: `#${backgroundColor}`,
    };

    return (
        <div className="plus-button-container">
            <div className="btn-bg" style={styleBg}>
            </div>
            <div className="btn-icon">
                <button onClick={onClick} className="btn" style={{ display: hide ? 'none' : 'block' }}>
                    <i className={`fas fa-${faName}`} style={styleIcon}/>
                </button>
            </div>
        </div>);
};
export default PlusButton;
