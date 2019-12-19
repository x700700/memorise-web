import * as _ from '../../common/boolidash';
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
            const trainings = { ...mockMultiplyTraining, ...action.trainingsMap};
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
            // Put the new training 2nd, after the offline one (multiplicity chart)
            const [item1, restMap] = _.slice0(state.trainingsMap);
            const newTraining = _.toObject(action.training, 'id');
            const updatedTrainings = Object.assign(item1, newTraining, restMap);
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
