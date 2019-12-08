import React, {useState} from "react";
import './DrawerButtons.scss';
import IconButton from "../_Tools/IconButton";

const DrawerButtons = ({ size, color, backgroundColor, backgroundColorDraw }) => {
    const [open, setOpen] = useState(false);

    const clicked = () => {
        setOpen(!open);
    };

    const numOfButtons = 2;
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
    const styleAbsolute = {
        marginLeft: `-${size + 1}rem`,
        transform: `translateX(${open ? '3rem' : '9rem'})`,
    };

    return (
        <div className="drawer-buttons-container" style={styleDrawer}>
            <div className="buttons-absolute" style={{ ...styleAbsolute, ...styleBgDraw}}>
                <div className="btns-row">
                    <IconButton faName="running" size={size}/>
                    <IconButton faName="grin-beam-sweat" size={size}/>
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
