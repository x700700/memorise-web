import * as types from '../actionsTypes';

const editTrainingReducer = (  state = {
                                   isFetching: false,
                                   isLoaded: false,
                                   idToFetch: null,
                                   training: null,
                               },
                      action) => {

    switch (action.type) {

        case types.EDIT_TRAINING_START_FETCH:
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
                training: null,
                idToFetch: action.id,
            };
        case types.EDIT_TRAINING_FETCH_SUCCEED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                training: action.training,
            };
        case types.EDIT_TRAINING_FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
                training: null,
                // isLoaded: true,
            };
        default:
            return state;
    }
};
export default editTrainingReducer;
