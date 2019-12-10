import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as types from '../../redux/actionsTypes';
import './EditTrainingHeader.scss';
import TextInput from "../_Tools/TextInput";
import IconButton from "../_Tools/IconButton";
import {renameTraining} from "../../redux/actions";


const EditTrainingHeader = ({ id, play, exam, onNameEdit }) => {
    const dispatch = useDispatch();
    const name = useSelector(state => state.editTraining.name);
    const [inputDisabled, setInputDisabled] = useState(false);

    const rename = () => {
        const newName = refName.current.value();
        console.warn('rename - ', newName);
        setInputDisabled(true);
        setTimeout(() => setInputDisabled(false), 100);
        dispatch(renameTraining(id, newName));
    };

    const _play = () => {
        play()
    };
    const _exam = () => {
        exam();
    };
    const onNameFocus = () => {
        // console.warn('On name focus');
        onNameEdit && onNameEdit(true);
        onNameEdit && dispatch({ type: types.APP_SET_TRAINING_NAME_IS_ON_EDIT, edit: true });
    };
    const onNameBlur = (enterPressed) => {
        console.warn('On name blur - Cancel');
        onNameEdit && onNameEdit(false);
        onNameEdit && dispatch({ type: types.APP_SET_TRAINING_NAME_IS_ON_EDIT, edit: false });
        !enterPressed && refName.current.setValue(name);
    };

    const refName = useRef();
    return (
        <div className="edit-training-header-container">
            <div className="header-row">
                <div className="field name">
                    <TextInput ref={refName} type="training" defaultValue={name}
                               onEnter={rename} onFocus={onNameFocus} onBlur={onNameBlur}
                               noMargin={true} disabled={inputDisabled}
                    />
                </div>
                <div className="edit-training-buttons">
                    <IconButton size={2} faName="running" onClick={_play}/>
                    <IconButton size={2} faName="grin-beam-sweat" onClick={_exam}/>
                </div>
            </div>
        </div>);
};
export default EditTrainingHeader;
