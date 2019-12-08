import React, {useState} from "react";
import './DrawerButtons.scss';
import IconButton from "../_Tools/IconButton";

const DrawerButtons = ({ size, color, backgroundColor, backgroundColorDraw, icons }) => {
    const [open, setOpen] = useState(false);

    const clicked = () => {
        setOpen(!open);
    };

    const numOfButtons = icons.length;
    const styleDrawer = {
        width: `${(size + 1) * (numOfButtons + 1)}rem`,
        marginLeft: `-${(size + 1) * numOfButtons}rem`,
        boxShadow: open ? '5px 5px 14px -4px #aaa' : 'none',
    };
    const styleOpenBtn = {
        height: `${size + 1}.1rem`
    };
    const styleBg = {
        backgroundColor: `#${backgroundColor}`,
    };
    const styleBgDraw = {
        backgroundColor: `#${backgroundColorDraw || backgroundColor}`,
    };
    const xClose = (size + 1) * (numOfButtons + 1);
    const xOpen = size + 1;
    const styleAbsolute = {
        marginLeft: `-${size + 1}rem`,
        transform: 'translateX(' + `${open ? xOpen : xClose}` + 'rem)', // eslint-disable-line no-useless-concat
    };

    return (
        <div className="drawer-buttons-container" style={styleDrawer}>
            <div className="buttons-absolute" style={{ ...styleAbsolute, ...styleBgDraw}}>
                <div className="btns-row">
                    {icons && icons.map(x =>
                        <IconButton faName={x} size={size}/>
                    )}
                </div>
            </div>
            <div className="open-button" style={styleOpenBtn}>
                <IconButton faName="bars" size={size} onClick={clicked}/>
            </div>
            <div className="open-button-absolute" style={styleBg}>
                <IconButton faName="bars" size={size} onClick={clicked}/>
            </div>
        </div>);
};
export default DrawerButtons;
