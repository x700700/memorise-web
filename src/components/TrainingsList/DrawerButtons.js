import React, {useEffect, useState} from "react";
import './DrawerButtons.scss';
import {useDispatch} from "react-redux";
import * as types from '../../redux/actionsTypes';
import IconButton from "../_Tools/IconButton";
import logger from "../../common/logger";


const DrawerButtons = ({ trainingId, forceClose, size, color, backgroundColor, backgroundColorDraw, icons }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [closeEnded, setCloseEnded] = useState(true);

    const clicked = () => {
        setCloseEnded(false);
        setOpen(!open);
        dispatch({ type: types.APP_SET_ACTIVE_DRAWER_TRAINING, id: !open ? trainingId : null });
    };
    const actionClicked = (cb) => {
        dispatch({ type: types.APP_SET_ACTIVE_DRAWER_TRAINING, id: null });
        cb();
    };

    const numOfButtons = icons.length;
    const styleDrawer = {
        width: (open || !closeEnded) ? `${(size + 1) * (numOfButtons + 1)}rem` : `${size + 1}rem`,
        marginLeft: (open || !closeEnded) && `-${(size + 1) * numOfButtons}rem`,
        boxShadow: open ? '5px 5px 14px -4px #aaa' : 'none', // '0px 0px 7px 2px #884dff'
    };
    const styleButtonSize = {
        width: `${size + 1}rem`,
        height: 'min-content', // `${size + 1}rem`,
    };

    const xClose = `${(size + 1) * (numOfButtons + 1)}rem`;
    const xOpen = `${size + 1}rem`;
    const styleAbsolute = {
        marginLeft: `-${size + 1}rem`,
        transform: 'translateX(' + `${open ? xOpen : xClose}` + ')', // eslint-disable-line no-useless-concat
    };

    useEffect(() => {
        logger.trace('DrawerButton update');
        if (open && forceClose) {
            setCloseEnded(false);
            setOpen(false);
        }
    }, [forceClose, open, setOpen, setCloseEnded]);

    const divAbsoluteId = `drawer-buttons-absolute-${trainingId}`;
    useEffect(() => {
        logger.trace('DrawerButton mount');

        const drawerClosed = () => {
            setCloseEnded(true);
        };
        document.getElementById(divAbsoluteId).addEventListener("transitionend", drawerClosed);
        return () => {
            const el = document.getElementById(divAbsoluteId);
            el && drawerClosed && el.removeEventListener("transitionend", drawerClosed);
        }
    }, [open, setCloseEnded, divAbsoluteId]);

    const iconId = open ? 'active' : '';
    return (
        <div id={divAbsoluteId} className="drawer-buttons-container" style={styleDrawer}>
            <div className="buttons-absolute" style={styleAbsolute}>
                <div className="btns-row">
                    {icons && icons.map((x, i) =>
                        <div key={`drawer-icon-btn-${i}`} className="button-border" style={styleButtonSize}>
                            <IconButton faName={x.name} size={size - .3} onClick={() => actionClicked(x.onClick)} iconId={iconId} isBorder={true} isDrawer={true} backgroundColor={backgroundColorDraw}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="open-button">
                <div className="button-border" style={styleButtonSize} onClick={clicked}>
                    <IconButton faName="bars" size={size - .3} iconId={iconId} isBorder={true} isDrawer={true} backgroundColor={backgroundColor}/>
                </div>
            </div>
            <div className="open-button-absolute">
                <div className="button-border" style={styleButtonSize} onClick={clicked}>
                    <IconButton faName="bars" size={size - .3} iconId={iconId} isBorder={true} isDrawer={true} backgroundColor={backgroundColor}/>
                </div>
            </div>
        </div>);
};
export default DrawerButtons;
