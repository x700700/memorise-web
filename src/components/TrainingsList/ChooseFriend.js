import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './ChooseFriend.scss';
import {useTranslation} from "react-i18next";
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";
import {validateName} from "../../common/utils";
import { getFriendTrainingsList } from '../../redux/actions';


const ChooseFriend = ({ closeModal }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.app.userName);
    const friendName = useSelector(state => state.app.friendName);
    const [errName, setErrName] = useState(t('err-name-valid'));

    const checkName = (text) => {
        if (!validateName(text) || (text && text.toLowerCase() === userName.toLowerCase())) {
            setErrName(t('err-name-valid'));
        } else {
            setErrName(null);
        }
    };
    const playFriend = () => {
        const friendName = refName.current.value();
        console.warn('play friend - ', friendName);
        dispatch(getFriendTrainingsList(friendName));
        closeModal();
    };
    const cancel = () => {
        closeModal();
    };

    const refName = useRef();
    return (
        <div className="choose-friend-container">
            <div className="friend-row">
                <div className="field friend-name">
                    <TextInput ref={refName} label={t('friend name')} defaultValue={friendName || ''} autoFocus={true}
                               onChange={checkName} error={errName}
                    />
                </div>
                <div className="play-btn-container">
                    <Button type="ok" text={t('play friend btn')} disabled={errName && true} onClick={() => playFriend} />
                </div>
            </div>
            <div className="cancel-btn-container">
                <div className="play-btn-container">
                    <Button type="cancel" text={t('cancel')} disabled={false} onClick={() => cancel} />
                </div>
            </div>
        </div>);
};
export default ChooseFriend;
