import React from "react";
import './AddButton.scss';
import {useDispatch, useSelector} from "react-redux";
import consts from "../common/consts";
import {createExercise, createTraining} from "../redux/actions";
import IconButton from "./_Tools/IconButton";
import * as types from "../redux/actionsTypes";
import {useHistory} from "react-router";

const AddButton = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const authCheckEnded = useSelector(state => state.app.authCheckEnded);
    const loggedInUserName = useSelector(state => state.app.userName);
    const currPage = useSelector(state => state.app.currentPage);
    const showMenu = useSelector(state => state.app.showMenu);
    const isModalOn = useSelector(state => state.app.isModalOn);
    const trainingNameIsOnEdit = useSelector(state => state.app.trainingNameIsOnEdit);
    const editTrainingId = useSelector(state => state.editTraining.fetchedId);

    const login = (e) => {
        history.push('/login');
    };

    const addTraining = (e) => {
        // console.warn('Add Training');
        dispatch({ type: types.APP_SET_ACTIVE_DRAWER_TRAINING, id: null });
        window.scrollTo(0, 0);
        dispatch(createTraining());
    };
    const addExercise = (e) => {
        // console.warn('Add Exercise');
        window.scrollTo(0, 0);
        dispatch(createExercise(editTrainingId));
    };

    const disableAddBtn = !loggedInUserName || showMenu || isModalOn || trainingNameIsOnEdit;
    return (
        <div className="add-button-container">
            <div className="btn-container">
                <IconButton size={3} faName="user" onClick={login}
                            hide={!authCheckEnded || loggedInUserName || [consts.pageName.practice, consts.pageName.exam, consts.pageName.login].includes(currPage)}
                            color="ffe6ff" backgroundColor="ff4ddd"
                />
                <IconButton size={3} faName="plus" onClick={addTraining} hide={disableAddBtn || currPage !== consts.pageName.trainings}
                            color="eee6ff" backgroundColor="884dff"
                />
                <IconButton size={3} faName="plus" onClick={addExercise} hide={disableAddBtn || currPage !== consts.pageName.edit}
                            color="eee6ff" backgroundColor="884dff"
                />
            </div>
        </div>)
};
export default AddButton;
