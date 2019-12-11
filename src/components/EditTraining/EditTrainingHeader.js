import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as types from '../../redux/actionsTypes';
import './EditTrainingHeader.scss';
import TextInput from "../_Tools/TextInput";
import IconButton from "../_Tools/IconButton";
import {renameTraining} from "../../redux/actions";


const EditTrainingHeader = ({ id, play, exam, onNameEdit }) => {
    const dispatch = useDispatch();
    const isLoaded = useSelector(state => state.editTraining.isLoaded);
    const name = useSelector(state => state.editTraining.name);
    const [nameInputDisabled, setNameInputDisabled] = useState(false);
    const [nameInputOnEdit, setNameInputOnEdit] = useState(false);
    const [shouldAutoFocus, setShouldAutoFocus] = useState(false);

    const rename = () => {
        const newName = refName.current.value();
        console.warn('rename - ', newName);
        setNameInputDisabled(true);
        setTimeout(() => setNameInputDisabled(false), 100);
        dispatch(renameTraining(id, newName));
    };

    const _play = () => {
        !nameInputOnEdit && play();
    };
    const _exam = () => {
        !nameInputOnEdit && exam();
    };
    const onNameFocus = () => {
        // console.warn('On name focus');
        setNameInputOnEdit(true);
        onNameEdit(true);
        dispatch({ type: types.APP_SET_TRAINING_NAME_IS_ON_EDIT, edit: true });
    };
    const onNameBlur = (val, enterPressed) => {
        // console.warn('On name blur - Cancel');
        setNameInputOnEdit(false);
        onNameEdit(false);
        dispatch({ type: types.APP_SET_TRAINING_NAME_IS_ON_EDIT, edit: false });

        !enterPressed && refName.current.setValue(name);
    };

    useEffect(() => {
        if (isLoaded && !name) {
            setShouldAutoFocus(true);
        }
    }, [name, isLoaded]);

    const styleOnEdit = {
        pointerEvents: nameInputOnEdit ? 'none' : 'auto',
    };
    const refName = useRef();
    return (
        <div className="edit-training-header-container">
            {isLoaded && (name || shouldAutoFocus) &&
            <div className="header-row">
                <div className="field name">
                    <TextInput ref={refName} type="training" defaultValue={name} autoFocus={shouldAutoFocus}
                               onEnter={rename} onFocus={onNameFocus} onBlur={onNameBlur}
                               noMargin={true} disabled={nameInputDisabled}
                    />
                </div>
                <div className="edit-training-buttons" style={styleOnEdit}>
                    <IconButton size={2} faName="copy" onClick={_play}/>
                    <IconButton size={2} faName="grin-beam-sweat" onClick={_exam}/>
                </div>
            </div>
            }
        </div>);
};
export default EditTrainingHeader;
