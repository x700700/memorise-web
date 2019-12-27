import React, {useEffect} from "react";
import './PopupMsg.scss'
import {useDispatch} from "react-redux";
import * as types from "../../redux/actionsTypes";
import IconButton from "./IconButton";
import {purple} from "@material-ui/core/colors";
import logger from "../../common/logger";

const PopupMsg = ({ title, msg }) => {
    const dispatch = useDispatch();

    const close = () => {
        dispatch({ type: types.APP_SET_POPUP_MSG, text: null });
    };

    useEffect(() => {
        logger.trace('Popup Msg = ', msg);
        if (msg) {
            const myTimeout = setTimeout(() => {
                dispatch({ type: types.APP_SET_POPUP_MSG, text: null });
            }, 3000);
            return () => {
                clearTimeout(myTimeout);
            }
        }
    }, [msg, dispatch]);

    const styleContainer = {
        opacity: 1,
        pointerEvents: 'all',
    };
    return (
        <div className="popup-msg-container" style={msg ? styleContainer : {}}>
            <div className="popup-msg-box">
                <div className="popup-close-btn">
                    <IconButton size={1} faName="times" onClick={close} color={purple[50]} />
                </div>
                <div className="popup-title">
                    {title}
                </div>
                <div className="popup-msg">
                    {msg}
                </div>
            </div>
        </div>);
};
export default PopupMsg;
