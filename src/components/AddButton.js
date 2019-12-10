import React from "react";
import './AddButton.scss';
import {useDispatch, useSelector} from "react-redux";
import consts from "../common/consts";
import {createExercise, createTraining} from "../redux/actions";
import IconButton from "./_Tools/IconButton";

const AddButton = (props) => {
    const dispatch = useDispatch();
    const currPage = useSelector(state => state.app.currentPage);
    const showMenu = useSelector(state => state.app.showMenu);
    const trainingNameIsOnEdit = useSelector(state => state.app.trainingNameIsOnEdit);
    const editTrainingId = useSelector(state => state.editTraining.fetchedId);

    const addTraining = (e) => {
        // console.warn('Add Training');
        dispatch(createTraining());
    };
    const addExercise = (e) => {
        // console.warn('Add Exercise');
        dispatch(createExercise(editTrainingId));
    };

    const disable = showMenu || trainingNameIsOnEdit;
    return (
        <div className="add-button-container">
            <div className="btn-container">
                <IconButton size={3} faName="plus" onClick={addTraining} hide={disable || currPage !== consts.pageName.trainings}
                            color="eee6ff" backgroundColor="884dff"
                />
                <IconButton size={3} faName="plus" onClick={addExercise} hide={disable || currPage !== consts.pageName.edit}
                            color="eee6ff" backgroundColor="884dff"
                />
            </div>
        </div>)
};
export default AddButton;
