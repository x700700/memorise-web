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

    const updatedTraining = state.training;
    switch (action.type) {

        case types.FETCH_EDIT_TRAINING_START:
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
                training: null,
                idToFetch: action.id,
            };
        case types.FETCH_EDIT_TRAINING_SUCCEED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                training: action.training,
                fetchedId: action.training && action.training.id,
            };
        case types.FETCH_EDIT_TRAINING_FAILED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true, // Todo - false
                training: mockTraining, // Todo - remove
                // fetchedId: null, // Todo - do it
            };


        case types.FETCH_CREATE_EXERCISE_START:
            return {
                ...state,
                isFetching: true,
            };
        case types.FETCH_CREATE_EXERCISE_SUCCEED:
            updatedTraining.exercises[action.exercise.id] = action.exercise;
            return {
                ...state,
                isFetching: false,
                training: updatedTraining,
            };
        case types.FETCH_CREATE_EXERCISE_FAILED:
            return {
                ...state,
                isFetching: false,
            };

        case types.FETCH_SAVE_EXERCISE_START:
            return {
                ...state,
                isFetching: true,
            };
        case types.FETCH_SAVE_EXERCISE_SUCCEED:
            updatedTraining.exercises[action.exercise.id] = action.exercise;
            return {
                ...state,
                isFetching: false,
                training: updatedTraining,
            };
        case types.FETCH_SAVE_EXERCISE_FAILED:
            return {
                ...state,
                isFetching: false,
            };

        default:
            return state;
    }
};
export default editTrainingReducer;
