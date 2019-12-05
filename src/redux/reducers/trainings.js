import * as types from '../actionsTypes';

const trainingsReducer = (  state = {
                                isFetching: false,
                                isLoaded: false,
                                trainingsList: null,
                            },
                      action) => {

    switch (action.type) {

        case types.TRAININGS_START_FETCH:
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
                trainingsList: null,
            };
        case types.TRAININGS_FETCH_SUCCEED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                trainingsList: action.trainings,
            };
        case types.TRAININGS_FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
                trainingsList: null,
            };
        default:
            return state;
    }
};
export default trainingsReducer;
