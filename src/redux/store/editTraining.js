import * as types from '../actionsTypes';
import logger from "../../common/logger";
// import mockTraining from '../../mock/training-words1';

const editTrainingReducer = (  state = {
                                   isFetching: false,
                                   isLoaded: false,
                                   idToFetch: null,
                                   fetchedId: null,
                                   training: null,
                                   lastNewExerciseId: null,
                                   idToDelete: null,

                                   isRenaming: false,
                                   isRenamed: false,
                                   name: null,
                                   nameBeforeEdit: null,
                                   wordToTranslate: null,
                                   translatedWord: null,
                               },
                      action) => {

    switch (action.type) {

        case types.TRAINING_UPDATE_LAST_NEW_EXERCISE_ID:
            return {
                ...state,
                lastNewExerciseId: action.id,
            };
        case types.TRAINING_RESET:
            return {
                ...state,
                isLoaded: false,
                training: null,
                idToFetch: null,
                fetchedId: null,
                lastNewExerciseId: null,
                name: null,
                nameBeforeEdit: null,
            };
        case types.TRAINING_SET_DELETE_ID:
            return {
                ...state,
                idToDelete: action.id,
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
                isLoaded: false,
                training: null,
                name: null,
                nameBeforeEdit: null,
                fetchedId: null,
                /*
                // Mock:
                isLoaded: true,
                training: mockTraining,
                name: mockTraining.name,
                nameBeforeEdit: mockTraining.name,
                */
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



        case types.FETCH_DELETE_EXERCISE_START:
            return {
                ...state,
                isFetching: true,
            };
        case types.FETCH_DELETE_EXERCISE_SUCCEED:
            delete state.training.exercises[action.exercise.id];
            return {
                ...state,
                isFetching: false,
                lastDeletedExerciseId: action.exercise.id,
            };
        case types.FETCH_DELETE_EXERCISE_FAILED:
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


        case types.FETCH_TRANSLATE_START:
            return {
                ...state,
                isFetching: true,
                wordToTranslate: action.word,
                translatedWord: null,
            };
        case types.FETCH_TRANSLATE_SUCCEED:
            return {
                ...state,
                isFetching: false,
                wordToTranslate: null,
                translatedWord: action.translation.translation,
            };
        case types.FETCH_TRANSLATE_FAILED:
            return {
                ...state,
                isFetching: false,
                wordToTranslate: null,
                translatedWord: null,
            };

        default:
            return state;
    }
};
export default editTrainingReducer;
