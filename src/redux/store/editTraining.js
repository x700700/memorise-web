import * as types from '../actionsTypes';
import mockTraining from '../../mock/training-words1';

const editTrainingReducer = (  state = {
                                   isFetching: false,
                                   isLoaded: false,
                                   idToFetch: null,
                                   fetchedId: null,
                                   training: null,
                               },
                      action) => {

    switch (action.type) {

        case types.FETCH_EDIT_TRAINING_START_FETCH:
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
                training: null,
                idToFetch: action.id,
            };
        case types.FETCH_EDIT_TRAINING_FETCH_SUCCEED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                training: action.training,
                fetchedId: action.training && action.training.id,
            };
        case types.FETCH_EDIT_TRAINING_FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true, // Todo - false
                training: mockTraining, // Todo - remove
                // fetchedId: null, // Todo - do it
            };


        case types.CREATE_EXERCISE_START_FETCH:
            return {
                ...state,
                isFetching: true,
            };
        case types.CREATE_EXERCISE_FETCH_SUCCEED:
            const training = state.training;
            training.exercises[action.exercise.id] = action.exercise;
            return {
                ...state,
                isFetching: false,
                training: training,
            };
        case types.CREATE_EXERCISE_FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
            };

        default:
            return state;
    }
};
export default editTrainingReducer;
