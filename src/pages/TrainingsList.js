import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as types from "../redux/actionsTypes";
import {useHistory} from "react-router-dom";
import consts from "../common/consts";
import { trainingsGetList } from '../redux/actions';

const TrainingsList = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const isFetching = useSelector(state => state.trainings.isFetching);
    const isLoaded = useSelector(state => state.trainings.isLoaded);
    const trainingsMap = useSelector(state => state.trainings.trainingsMap);
    const trainingsList = isLoaded && trainingsMap && Object.values(trainingsMap);
    // console.warn('====> ', trainingsList);

    useEffect(() => {
        console.warn('TrainingsList mount');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.trainings });
        dispatch({type: types.APP_SHOW_MENU, show: false});
        if (!trainingsList) {
            dispatch(trainingsGetList());
        }
    }, [dispatch, history, trainingsList]);

    return (
        <div className="trainings-list-page">
            <div className="trainings-list-container">
                <div className="trainings-list-col">
                    {trainingsList && trainingsList.map((x, i) => {
                        return (
                            <div key={`training-${i}`}>
                                {x.name}
                            </div>);
                    })}
                </div>
            </div>
        </div>
    );
};
export default TrainingsList;
