import * as types from '../actionsTypes';

const trainingsReducer = (  state = {
                                isFetching: false,
                                isLoaded: false,
                                trainingsMap: null,
                            },
                      action) => {

    switch (action.type) {

        case types.TRAININGS_START_FETCH:
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
                trainingsMap: null,
            };
        case types.TRAININGS_FETCH_SUCCEED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                trainingsMap: action.trainingsMap,
            };
        case types.TRAININGS_FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
                trainingsMap: null,
            };
        default:
            return state;
    }
};
export default trainingsReducer;
