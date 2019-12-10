// import _ from 'lodash';
import * as types from '../actionsTypes';
import mockTrainingsList from '../../mock/trainings-list1';

const trainingsReducer = (  state = {
                                isFetching: false,
                                isLoaded: false,
                                trainingsMap: null,
                            },
                      action) => {

    const updatedTrainings = state.trainingsMap;
    switch (action.type) {

        case types.TRAININGS_RENAME:
            if (state.trainingsMap) (state.trainingsMap[action.training.id] || {}).name = action.training.name;
            return {
                ...state,
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


        case types.FETCH_CREATE_TRAINING_START:
            return {
                ...state,
                isFetching: true,
            };
        case types.FETCH_CREATE_TRAINING_SUCCEED:
            updatedTrainings[action.training.id] = action.training;
            return {
                ...state,
                isFetching: false,
                trainingsMap: updatedTrainings,
            };
        case types.FETCH_CREATE_TRAINING_FAILED:
            return {
                ...state,
                isFetching: false,
            };

        default:
            return state;
    }
};
export default trainingsReducer;
