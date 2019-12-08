import React, {useEffect, useState} from "react";
import './DrawerButtons.scss';
import IconButton from "../_Tools/IconButton";

const DrawerButtons = ({ trainingId, size, color, backgroundColor, backgroundColorDraw, icons }) => {
    const [open, setOpen] = useState(false);
    const [closeEnded, setCloseEnded] = useState(true);

    const clicked = () => {
        setCloseEnded(false);
        setOpen(!open);
    };

    const numOfButtons = icons.length;
    const styleDrawer = {
        width: (open || !closeEnded) && `${(size + 1) * (numOfButtons + 1)}rem`,
        marginLeft: (open || !closeEnded) && `-${(size + 1) * numOfButtons}rem`,
        boxShadow: open ? '5px 5px 14px -4px #aaa' : 'none', // '0px 0px 7px 2px #884dff'
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

    const divAbsoluteId = `drawer-buttons-absolute-${trainingId}`;
    useEffect(() => {
        const drawerClosed = () => {
            setCloseEnded(true);
        };
        document.getElementById(divAbsoluteId).addEventListener("transitionend", drawerClosed);
        return () => {
            document.getElementById(divAbsoluteId).removeEventListener("transitionend", drawerClosed);
        }
    }, [open, setCloseEnded, divAbsoluteId]);

    return (
        <div id={divAbsoluteId} className="drawer-buttons-container" style={styleDrawer}>
            <div className="buttons-absolute" style={{ ...styleAbsolute, ...styleBgDraw}}>
                <div className="btns-row">
                    {icons && icons.map((x, i) =>
                        <IconButton key={`drawer-icon-btn-${i}`} faName={x.name} size={size}
                                    onClick={x.onClick}
                        />
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
