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
                <PlusButton size={3} faName="plus" onClick={addTraining} hide={currPage !== consts.pageName.trainings}
                            color="eee6ff" backgroundColor="884dff"
                />
                <PlusButton size={3} faName="plus" onClick={addExercise} hide={currPage !== consts.pageName.edit}
                            color="eee6ff" backgroundColor="884dff"
                />
            </div>
        </div>)
};
export default AddButton;
