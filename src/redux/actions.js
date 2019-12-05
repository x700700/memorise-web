import * as types from './actionsTypes';

export const appAuth = () => ({
    type: types.saga.auth,
});

export const trainingsGetList = () => ({
    type: types.saga.getTrainingsList,
});

