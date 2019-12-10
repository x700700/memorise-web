import React, {useEffect} from "react";
import './TrainingsList.scss';
import {useDispatch, useSelector} from "react-redux";
import * as types from "../redux/actionsTypes";
import {useHistory} from "react-router-dom";
import consts from "../common/consts";
import { getTrainingsList } from '../redux/actions';
import Training from "../components/TrainingsList/Training";

const TrainingsList = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currPage = useSelector(state => state.app.currentPage);
    const isFetching = useSelector(state => state.trainings.isFetching);
    const isLoaded = useSelector(state => state.trainings.isLoaded);
    const trainingsMap = useSelector(state => state.trainings.trainingsMap);
    const lastNewTrainingId = useSelector(state => state.trainings.lastNewTrainingId);
    const trainingsList = isLoaded && trainingsMap && Object.values(trainingsMap);
    // console.warn('====> ', trainingsList);

    useEffect(() => {
        if (lastNewTrainingId) {
            // console.warn('new training');
            dispatch({ type: types.TRAININGS_UPDATE_LAST_NEW_TRAINING_ID, id: null });
            history.push(`/trainings/${lastNewTrainingId}/edit`);
        }
    }, [lastNewTrainingId]);

    useEffect(() => {
        if (currPage !== consts.pageName.trainings) {
            // console.warn('TrainingsList mount');
            dispatch({type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.trainings});
            dispatch({type: types.APP_SHOW_MENU, show: false});
        }
        if (!trainingsList && !isFetching) {
            dispatch(getTrainingsList());
        }
    }, [dispatch, history, trainingsList, isFetching, currPage]);

    return (
        <div className="trainings-list-page">
            <div className="trainings-list-container">
                <div className="trainings-list-col">
                    {trainingsList && trainingsList.map((x, i) => {
                        return (
                            <div key={`training-${i}`}>
                                <Training training={x}/>
                            </div>);
                    })}
                </div>
            </div>
        </div>
    );
};
export default TrainingsList;
