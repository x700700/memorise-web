import React, {useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './MenuTrainings.scss';
// import consts from '../../common/consts';
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
    const friendName = useSelector(state => state.app.friendName);

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
            </div>
            }
            <Modal ref={refModal} title={t('play friend btn title')} disableBackdropClick={false}>
                <ChooseFriend closeModal={closeModal}/>
            </Modal>
        </TopMenu>
    );
};
export default MenuTrainings;
