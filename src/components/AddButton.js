import React from "react";
import './AddButton.scss';
import {useDispatch, useSelector} from "react-redux";
import consts from "../common/consts";
import {createExercise} from "../redux/actions";
import PlusButton from "./_Tools/PlusButton";

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
                <div className={`btn-add-training ${currPage !== consts.pageName.trainings ? 'hide' : ''}`} onClick={addTraining}>
                    <PlusButton size={3.5}/>
                </div>
                <div className={`btn-add-exercise ${currPage !== consts.pageName.edit ? 'hide' : ''}`} onClick={addExercise}>
                    <PlusButton size={3.5}/>
                </div>
            </div>
        </div>)
};
export default AddButton;
