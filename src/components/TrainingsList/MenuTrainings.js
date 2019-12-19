import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './MenuTrainings.scss';
import consts from '../../common/consts';
import TopMenu from "../_Tools/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";
import Button from "../_Tools/Button";
import Modal from "../_Tools/Modal";
import ChooseFriend from "./ChooseFriend";


const MenuTrainings = ({ hide }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.app.userName);
    const storeFriendName = useSelector(state => state.app.friendName);
    const [friendName, setFriendName] = useState(null);

    const playFriend = () => {
        dispatch({ type: types.APP_SHOW_MENU, show: false });
        refModal.current.open();
    };
    const playMine = () => {
        dispatch({ type: types.APP_SET_FRIEND_NAME, friendName: null });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
    };

    const closeModal = () => {
        refModal.current.close();
    };

    const logout = () => {
        localStorage.removeItem(consts.localStorage.tokenId);
        localStorage.removeItem(consts.localStorage.friendId);
        dispatch({ type: types.APP_AUTH_RESET });
        dispatch({ type: types.TRAININGS_LIST_RESET });
        dispatch({ type: types.FRIEND_TRAININGS_LIST_RESET });
        dispatch({ type: types.TRAINING_RESET });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
    };

    useEffect(() => {
        setTimeout(() => {
            setFriendName(storeFriendName);
        }, 800);
    }, [storeFriendName, setFriendName]);

    const refModal = useRef();
    return (
        <TopMenu hide={hide}>
            {userName &&
            <div className="menu-trainings-col">
                <div className="title">{userName}</div>
                {!friendName ?
                    <div className="friend-btn-row">
                        <div className="msg">{t("play friend btn title")}</div>
                        <div className="friend-btn-container">
                            <Button text={t('play friend btn')} onClick={() => playFriend}/>
                        </div>
                    </div> :
                    <div className="friend-btn-row">
                        <div className="msg">{t("play mine btn title")}</div>
                        <div className="friend-btn-container">
                            <Button text={t('play mine btn')} onClick={() => playMine}/>
                        </div>
                    </div>
                }
                <div className="logout-btn-container">
                    <Button type="cancel" text={t('logout')} onClick={() => logout} />
                </div>
            </div>
            }
            <Modal ref={refModal} title={t('play friend btn title')} disableBackdropClick={false}>
                <ChooseFriend closeModal={closeModal}/>
            </Modal>
        </TopMenu>
    );
};
export default MenuTrainings;
