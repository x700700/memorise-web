import React, {useRef } from "react";
import './Exercise.scss';
import Modal from "../_Tools/Modal";

const Exercise = ({ exercise }) => {
    const refModal = useRef();
    const onModalClose = () => {
        console.warn('********** modal parent\'s onClose');
    };
    const edit = (exercise) => {
        refModal.current.handleOpen();
    };

    return (
        <div className="edit-training-exercise-container">
            <div className="exercise-col" onClick={edit}>
                <div className="exercise question">{exercise.q}</div>
                <div className="exercise answer">{exercise.a}</div>
            </div>
            <Modal ref={refModal} onClose={onModalClose}>
                <div>
                    <div>{exercise.q}</div>
                    <div>{exercise.a}</div>
                </div>
            </Modal>
        </div>);
};
export default Exercise;
