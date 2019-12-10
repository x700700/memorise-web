// import _ from 'lodash';
import * as types from '../actionsTypes';
import mockTrainingsList from '../../mock/trainings-list1';

const trainingsReducer = (  state = {
                                isFetching: false,
                                isLoaded: false,
                                trainingsMap: null,
                            },
                      action) => {

    switch (action.type) {

        case types.TRAININGS_RENAME:
            if (state.trainingsMap) (state.trainingsMap[action.training.id] || {}).name = action.training.name;
            return {
                ...state,
            };


        case types.FETCH_TRAININGS_START:
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
                trainingsMap: null,
            };
        case types.FETCH_TRAININGS_SUCCEED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                trainingsMap: action.trainingsMap,
            };
        case types.FETCH_TRAININGS_FAILED:
            return {
                ...state,
                isFetching: false,
                trainingsMap: mockTrainingsList,
                isLoaded: true,
            };
        default:
            return state;
    }
};
export default trainingsReducer;
