import * as types from '../actionsTypes';

const friendTrainingsReducer = (  state = {
                                isFetching: false,
                                isLoaded: false,
                                trainingsMap: null,
                            },
                      action) => {

    switch (action.type) {

        case types.FRIEND_TRAININGS_LIST_RESET:
            return {
                ...state,
                isLoaded: false,
                trainingsMap: null,
            };


        case types.FETCH_FRIEND_TRAININGS_START:
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
                trainingsMap: null,
            };
        case types.FETCH_FRIEND_TRAININGS_SUCCEED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                trainingsMap: action.trainingsMap,
            };
        case types.FETCH_FRIEND_TRAININGS_FAILED:
            return {
                ...state,
                isFetching: false,
                trainingsMap: null,
                isLoaded: true,
            };

        default:
            return state;
    }
};
export default friendTrainingsReducer;
