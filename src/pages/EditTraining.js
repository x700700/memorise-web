import React, {useEffect} from "react";
import './EditTraining.scss';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import consts from "../common/consts";
import * as types from "../redux/actionsTypes";
import {getEditTraining} from "../redux/actions";

const EditTraining = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const currPage = useSelector(state => state.app.currentPage);
    const isFetching = useSelector(state => state.editTraining.isFetching);
    const isLoaded = useSelector(state => state.editTraining.isLoaded);
    const training = useSelector(state => state.editTraining.training);
    const exercisesMap = isLoaded && training && training.exercises;
    const exercisesList = exercisesMap && Object.values(exercisesMap);
    // console.warn('====> ', trainingsList);

    // const getEditTrainingCb = useCallback((id) => dispatch(getEditTraining(id)), [getEditTraining]);
    useEffect(() => {
        if (currPage !== consts.pageName.edit) {
            console.warn('EditTraining mount');
            dispatch({type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.edit});
            dispatch({type: types.APP_SHOW_MENU, show: false});
        }
        if ((!training && !isFetching) || (training && id && id !== training.id)) {
            dispatch(getEditTraining(id))
        }
    }, [dispatch, history, id, training, isFetching, currPage]);

    return (
        <div className="edit-training-page">
            *** EDIT ***
            <div className="edit-training-container">
                <div className="edit-training-col">
                    <div className="exercises-list">
                        {exercisesList && exercisesList.map((x,i) => {
                            return (
                                <div key={`edit-training-exercise-${i}`}>
                                    {x.q} === {x.a}
                                </div>);
                        })}
                    </div>
                </div>

            </div>
        </div>)
};
export default EditTraining;
