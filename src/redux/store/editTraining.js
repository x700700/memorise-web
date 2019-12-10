import * as types from '../actionsTypes';
import mockTraining from '../../mock/training-words1';

const editTrainingReducer = (  state = {
                                   isFetching: false,
                                   isLoaded: false,
                                   idToFetch: null,
                                   fetchedId: null,
                                   training: null,
                                   lastNewExerciseId: null,

                                   isRenaming: false,
                                   isRenamed: false,
                                   name: null,
                                   nameBeforeEdit: null,
                               },
                      action) => {

    switch (action.type) {

        case types.TRAINING_UPDATE_LAST_NEW_EXERCISE_ID:
            return {
                ...state,
                lastNewExerciseId: action.id,
            };

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
                name: action.training.name,
                nameBeforeEdit: action.training.name,
            };
        case types.FETCH_EDIT_TRAINING_FAILED:
            return {
                ...state,
                isFetching: false,
                isLoaded: true, // Todo - false
                training: mockTraining, // Todo - remove
                name: mockTraining.name, // Todo - remove
                nameBeforeEdit: mockTraining.name, // Todo - remove
                // fetchedId: null, // Todo - do it
            };


        case types.FETCH_RENAME_TRAINING_START:
            return {
                ...state,
                isRenaming: true,
                isRenamed: false,
                nameBeforeEdit: state.name,
                name: action.name,
            };
        case types.FETCH_RENAME_TRAINING_SUCCEED:
            return {
                ...state,
                isRenaming: false,
                isRenamed: true,
                name: action.training.name,
            };
        case types.FETCH_RENAME_TRAINING_FAILED:
            return {
                ...state,
                isFetching: false,
                isRenamed: false,
                name: state.nameBeforeEdit,
            };


        case types.FETCH_CREATE_EXERCISE_START:
            return {
                ...state,
                isFetching: true,
            };
        case types.FETCH_CREATE_EXERCISE_SUCCEED:
            const newExercise = {};
            newExercise[action.exercise.id] = action.exercise;
            const updatedExercises = Object.assign(newExercise, state.training.exercises);
            state.training.exercises = updatedExercises;
            return {
                ...state,
                isFetching: false,
                lastNewExerciseId: action.exercise.id,
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
            state.training.exercises[action.exercise.id] = action.exercise;
            return {
                ...state,
                isFetching: false,
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
