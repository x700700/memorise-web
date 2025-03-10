import React from "react";
import './IconButton.scss';

const IconButton = ({ faName, size, hide, onClick, color, backgroundColor, iconId, isBorder, isDrawer }) => {

    const styleBox = {
        backgroundColor: isDrawer && backgroundColor,
    };
    const styleIcon = {
        fontSize: `${size}rem`,
        fontWeight: '300',
        color: color,
        backgroundColor: !isDrawer && backgroundColor,
    };

    return (
        <div className={`icon-button-container ${isBorder && 'icon-button-border'}`} style={styleBox}>
            <button onClick={() => onClick && onClick()} className="btn" style={{display: hide ? 'none' : 'initial'}}>
                <i id={iconId || ''} className={`${isDrawer ? 'active' : ''} fas fa-${faName}`} style={styleIcon}/>
            </button>
        </div>);
};
export default IconButton;
