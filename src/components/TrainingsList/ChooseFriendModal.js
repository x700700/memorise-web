import React, {useRef, useState} from "react";
import './ChooseFriendModal.scss';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import Button from "../_Tools/Button";
import {validateName} from "../../common/utils";
import { getFriendTrainingsList } from '../../redux/actions';
import * as types from "../../redux/actionsTypes";
import DropDown from "../_Tools/DropDown";
import {ThemeProvider} from "@material-ui/core/styles";
import Modal from "../_Tools/Modal";


const knownFriendsList = [
    { name: 'English' },
    { name: 'History' },
];

const themeModal = {
    width: '80%',
    height: 235,
};

const ChooseFriendModal = ({ modalRef, closeModal, onClose }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.app.userName);
    const [errName, setErrName] = useState(t('err-name-valid'));

    const checkName = (text) => {
        if (!validateName(text) || (text && text.toLowerCase() === userName.toLowerCase())) {
            setErrName(t('err-name-valid'));
        } else {
            setErrName(null);
        }
    };
    const openFriend = () => {
        const friendName = refName.current.value();
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
        dispatch(getFriendTrainingsList(friendName));
        closeModal();
        history.push('/trainings');
    };
    const cancel = () => {
        closeModal();
    };

    const onTagsChange = (event, value) => {
        refName.current.setValue(value || '', true);
    };


    const refName = useRef();
    return (
        <ThemeProvider theme={themeModal}>
            <Modal ref={modalRef} title={t('play friend btn title')} disableBackdropClick={false} onClose={onClose}>
                <div className="choose-friend-container">
                    <div className="friend-row">
                        <div className="field friend-name">
                            <DropDown id="choose-friend-autocomplete" options={knownFriendsList} freeSolo onChoose={onTagsChange}
                                      width="14rem" autoFocus={true}
                                      refInput={refName} label={t('friend name')}
                                      error={errName} onChange={checkName}
                            />
                        </div>
                    </div>
                    <div className="btns-container">
                        <div className="btn">
                            <Button type="ok" text={t('play friend btn')} disabled={errName && true} onClick={() => openFriend} />
                        </div>
                        <div className="btn">
                            <Button type="cancel" text={t('cancel')} disabled={false} onClick={() => cancel} />
                        </div>
                    </div>
                </div>
            </Modal>
        </ThemeProvider>);
};
export default ChooseFriendModal;
