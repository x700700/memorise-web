// import _ from 'lodash';
import * as types from '../actionsTypes';
import mockMultiplyTraining from '../../mock/training-multiply'

const trainingsReducer = (  state = {
                                isFetching: false,
                                isLoaded: false,
                                trainingsMap: null,
                                lastNewTrainingId: null,
                            },
                      action) => {

    switch (action.type) {

        case types.TRAININGS_RENAME:
            if (state.trainingsMap) (state.trainingsMap[action.training.id] || {}).name = action.training.name;
            return {
                ...state,
            };

        case types.TRAININGS_LIST_RESET:
            return {
                ...state,
                isLoaded: false,
                trainingsMap: null,
                lastNewTrainingId: null,
            };

        case types.TRAININGS_SAMPLE_EXERCISE_CHANGED:
            if (action.sampleExercise && action.sampleExercise.shouldReloadSampleExercises) {
                if (state.trainingsMap) (state.trainingsMap[action.sampleExercise.trainingId] || {}).sampleExercise = action.sampleExercise;
                return {
                    ...state,
                };
            } else {
                return state;
            }

        case types.TRAININGS_UPDATE_LAST_NEW_TRAINING_ID:
            return {
                ...state,
                lastNewTrainingId: action.id,
            };


        case types.FETCH_TRAININGS_START:
            return {
                ...state,
                isFetching: true,
                isLoaded: false,
                trainingsMap: null,
            };
        case types.FETCH_TRAININGS_SUCCEED:
            const trainings = Object.assign(mockMultiplyTraining, action.trainingsMap);
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                trainingsMap: trainings,
            };
        case types.FETCH_TRAININGS_FAILED:
            return {
                ...state,
                isFetching: false,
                trainingsMap: mockMultiplyTraining,
                isLoaded: true,
            };


        case types.FETCH_CREATE_TRAINING_START:
            return {
                ...state,
                isFetching: true,
            };
        case types.FETCH_CREATE_TRAINING_SUCCEED:
            const newTraining = {};
            newTraining[action.training.id] = action.training;

            // Put the new training 2nd, after the offline one (multiplicity chart)
            const tempMap = { ...state.trainingsMap };
            const key1 = Object.keys(tempMap)[0];
            let item1 = {};
            item1[key1] = tempMap[key1];
            delete tempMap[key1];
            const updatedTrainings = Object.assign(item1, newTraining, tempMap);
            return {
                ...state,
                isFetching: false,
                trainingsMap: updatedTrainings,
                lastNewTrainingId: action.training.id,
            };
        case types.FETCH_CREATE_TRAINING_FAILED:
            return {
                ...state,
                isFetching: false,
            };



        case types.FETCH_DELETE_TRAINING_START:
            return {
                ...state,
                isFetching: true,
            };
        case types.FETCH_DELETE_TRAINING_SUCCEED:
            delete state.trainingsMap[action.training.id];
            return {
                ...state,
                isFetching: false,
            };
        case types.FETCH_DELETE_TRAINING_FAILED:
            return {
                ...state,
                isFetching: false,
            };

        default:
            return state;
    }
};
export default trainingsReducer;
