import React, {useRef } from "react";
import {useDispatch} from "react-redux";
import './Exercise.scss';
import Modal from "../_Tools/Modal";
import TextInput from "../_Tools/TextInput";
import {useTranslation} from "react-i18next";
import Button from "../_Tools/Button";
import { saveExercise } from '../../redux/actions'


const Exercise = ({ exercise }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const refModal = useRef();
    const refQ = useRef();
    const refA = useRef();

    /*
    const onModalClose = () => {
    }; */

    const edit = () => {
        refModal.current.open();
    };
    const cancel = () => {
        refModal.current.close(); // causes the Modal not to be openned
    };
    const save = () => {
        // console.warn('SAVE Exercise - ', refQ.current.value(), refA.current.value());
        const updatedExercise = {
            q: refQ.current.value(),
            a: refA.current.value(),
        };
        dispatch(saveExercise(exercise.trainingId, exercise.id, updatedExercise));
        refModal.current.close(); // causes the Modal not to be openned
    };

    return (
        <div className="edit-training-exercise-container">
            <div className="exercise-col" onClick={edit}>
                <div className="exercise question">{exercise.q}</div>
                <div className="exercise answer">{exercise.a}</div>
            </div>
            <Modal ref={refModal} title={t("edit exercise")}>
                <div className="edit-modal-container">
                    <div className="field question">
                        <TextInput ref={refQ} type="q" defaultValue={exercise.q} autoFocus={true} onEnter={save}/>
                    </div>
                    <div className="field answer">
                        <TextInput ref={refA} type="a" defaultValue={exercise.a} onEnter={save}/>
                    </div>
                    <div className="buttons">
                        <div className="button-container">
                            <Button type="cancel" text={t('cancel')} onClick={() => cancel} />
                        </div>
                        <div className="button-container">
                            <Button type="ok" text={t('save')} onClick={() => save} />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>);
};
export default Exercise;
