import React, {useEffect, useState} from 'react';
import './MenuTrainings.scss';
import { useDispatch, useSelector } from "react-redux";
import logger from "../../common/logger";
// import consts from '../../common/consts';
import TopMenu from "../_Tools/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";



const MenuTrainings = ({ hide }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.app.userName);
    const storeFriendName = useSelector(state => state.app.friendName);
    const [friendName, setFriendName] = useState(null);


    const playMine = () => {
        dispatch({ type: types.APP_SET_FRIEND_NAME, friendName: null });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
    };


    useEffect(() => {
        logger.trace('MenuTraining update');
        setTimeout(() => {
            setFriendName(storeFriendName);
        }, 800);
    }, [storeFriendName, setFriendName]);

    return (
        <TopMenu hide={hide}>
            {userName &&
            <div className="menu-trainings-col">
                <div className="title">{userName}</div>
            </div>
            }
        </TopMenu>
    );
};
export default MenuTrainings;
