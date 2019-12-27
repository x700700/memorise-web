import React from "react";
import './TextBox.scss';

const TextBox = ({ children, text, styleText, fontSize, fontWeight, maxHeight, width, onClick }) => {
    const styleContainer = {
        maxHeight: maxHeight,
        fontSize: fontSize,
        fontWeight: fontWeight,
        minWidth: width,
        maxWidth: width,
    };

    return (
        <div className="text-box-container" style={styleContainer} onClick={onClick && onClick()}>
            <div className="text" style={styleText}>
                {text ? text : children}
            </div>
        </div>);
};
export default TextBox;
