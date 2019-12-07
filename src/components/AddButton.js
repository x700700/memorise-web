import React from "react";
import './AddButton.scss';
import {useDispatch, useSelector} from "react-redux";
import consts from "../common/consts";
import {createExercise} from "../redux/actions";

const AddButton = (props) => {
    const dispatch = useDispatch();
    const currPage = useSelector(state => state.app.currentPage);
    const editTrainingId = useSelector(state => state.editTraining.fetchedId);

    const addTraining = (e) => {
        console.warn('Add Training');
    };
    const addExercise = (e) => {
        console.warn('Add Exercise');
        dispatch(createExercise(editTrainingId));
    };

    return (
        <div className="add-button-container">
            <div className="btn-container">
                <div className={`btn btn-add-training ${currPage !== consts.pageName.trainings ? 'hide' : ''}`} onClick={addTraining}>
                    <span>+</span>
                </div>
                <div className={`btn btn-add-exercise ${currPage !== consts.pageName.edit ? 'hide' : ''}`} onClick={addExercise}>
                    <span>+</span>
                </div>
            </div>
        </div>)
};
export default AddButton;
