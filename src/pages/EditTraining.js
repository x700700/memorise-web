import React, {useEffect, /*useCallback*/} from "react";
import './EditTraining.scss';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import consts from "../common/consts";
import * as types from "../redux/actionsTypes";
import {getEditTraining} from "../redux/actions";
import Exercise from "../components/EditTraining/Exercise";

const EditTraining = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const currPage = useSelector(state => state.app.currentPage);
    const isFetching = useSelector(state => state.editTraining.isFetching);
    const isLoaded = useSelector(state => state.editTraining.isLoaded);
    const training = useSelector(state => state.editTraining.training);
    const idToFetch = useSelector(state => state.editTraining.idToFetch);
    const exercisesMap = isLoaded && training && training.exercises;
    const exercisesList = exercisesMap && Object.values(exercisesMap);

    // const getEditTrainingCb = useCallback((id) => dispatch(getEditTraining(id)), [getEditTraining]);
    useEffect(() => {
        if (currPage !== consts.pageName.edit) {
            // console.warn('EditTraining mount');
            dispatch({type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.edit});
            dispatch({type: types.APP_SHOW_MENU, show: false});
        }
        // console.warn('id <> idToFetch', id, idToFetch, training);
        if ((!training && !isFetching) || (training && id && id !== training.id)) {
            id !== idToFetch && dispatch(getEditTraining(id));
        }
    }, [dispatch, history, id, idToFetch, training, isFetching, currPage]);

    return (
        <div className="edit-training-page">
            <div className="edit-training-container">
                <div className="edit-training-flex">
                    {exercisesList && exercisesList.map((x,i) => {
                        return (
                            <div key={`edit-training-exercise-${i}`} className="exercise-container">
                                <Exercise exercise={x}/>
                            </div>);
                    })}
                </div>

            </div>
        </div>)
};
export default EditTraining;
