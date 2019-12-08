import React from "react";
import './IconButton.scss';

const IconButton = ({ faName, size, hide, onClick, color, backgroundColor }) => {

    const styleIcon = {
        fontSize: `${size}rem`,
        fontWeight: '300',
        color: `#${color}`,
        backgroundColor: `#${backgroundColor}`,
    };

    return (
        <div className="plus-button-container">
            <div className="btn-icon">
                <button onClick={onClick} className="btn" style={{ display: hide ? 'none' : 'block' }}>
                    <i className={`fas fa-${faName}`} style={styleIcon}/>
                </button>
            </div>
        </div>);
};
export default IconButton;
