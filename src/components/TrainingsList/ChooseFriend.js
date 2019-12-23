import React, {useRef, useState} from "react";
import './ChooseFriend.scss';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";
import {validateName} from "../../common/utils";
import { getFriendTrainingsList } from '../../redux/actions';
import * as types from "../../redux/actionsTypes";


const knownFriendsList = [
    { name: 'English' },
    { name: 'History' },
];

const ChooseFriend = ({ closeModal }) => {
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
    const isFriendShared = () => {
        const friendName = refName.current.value();
        // logger.warn('play friend - ', friendName);
        dispatch({ type: types.APP_SET_FRIEND_NAME, friendName: null });
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
        <div className="choose-friend-container">
            <div className="friend-row">
                <div className="field friend-name">
                    <Autocomplete
                        freeSolo
                        id="choose-friend-autocomplete"
                        // disableClearable
                        options={knownFriendsList.map(option => option.name)}
                        onChange={onTagsChange}
                        renderInput={params => (
                            <TextInput ref={refName} label={t('friend name')} width="14rem" autoFocus={true}
                                       error={errName} onChange={checkName}
                                       autoComplete={params}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="btns-container">
                <div className="btn">
                    <Button type="ok" text={t('play friend btn')} disabled={errName && true} onClick={() => isFriendShared} />
                </div>
                <div className="btn">
                    <Button type="cancel" text={t('cancel')} disabled={false} onClick={() => cancel} />
                </div>
            </div>
        </div>);
};
export default ChooseFriend;
