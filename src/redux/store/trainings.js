import * as types from '../actionsTypes';
import * as _ from '../../common/boolidash';
import mockMultiplyTraining from '../../mock/training-multiply'

const trainingsReducer = (  state = {
                                isFetching: false,
                                isLoaded: false,
                                trainingsMap: null,
                                lastNewTrainingId: null,
                                search: '',

                                isFetchingFriend: false,
                                isFriendLoaded: false,
                                friendTrainingsMap: null,
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


        case types.FRIEND_TRAININGS_LIST_RESET:
            return {
                ...state,
                isFriendLoaded: false,
                friendTrainingsMap: null,
            };


        case types.FETCH_FRIEND_TRAININGS_START:
            return {
                ...state,
                isFetchingFriend: true,
                isFriendLoaded: false,
                friendTrainingsMap: null,
            };
        case types.FETCH_FRIEND_TRAININGS_SUCCEED:
            return {
                ...state,
                isFetchingFriend: false,
                isFriendLoaded: true,
                friendTrainingsMap: action.trainingsMap,
            };
        case types.FETCH_FRIEND_TRAININGS_FAILED:
            return {
                ...state,
                isFetchingFriend: false,
                friendTrainingsMap: null,
                isFriendLoaded: true,
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


        case types.TRAININGS_LIST_SET_SEARCH:
            let trainingsMap = state.trainingsMap;
            let friendTrainingsMap = state.friendTrainingsMap;
            if (action.search) {
                trainingsMap = _.keyBy(Object.values(trainingsMap || {}).map(x => ({
                    ...x,
                    filtered: !(x.name || '').toLowerCase().includes(action.search.toLowerCase()),
                })), 'id');
                friendTrainingsMap = _.keyBy(Object.values(friendTrainingsMap || {}).map(x => ({
                    ...x,
                    filtered: !(x.name || '').toLowerCase().includes(action.search.toLowerCase()),
                })), 'id');
            } else {
                trainingsMap = _.keyBy(Object.values(trainingsMap || {}).map(x => ({ ...x, filtered: false })), 'id');
                friendTrainingsMap = _.keyBy(Object.values(friendTrainingsMap || {}).map(x => ({ ...x, filtered: false })), 'id');
            }
            return {
                ...state,
                search: action.search || '',
                trainingsMap: trainingsMap,
                friendTrainingsMap: friendTrainingsMap,
            };

        default:
            return state;
    }
};
export default trainingsReducer;
