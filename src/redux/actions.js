import * as types from './actionsTypes';

export const appAuth = () => ({
    type: types.saga.auth,
});

export const getTrainingsList = () => ({
    type: types.saga.getTrainingsList,
});

export const getEditTraining = (id) => ({
    type: types.saga.getEditTraining,
    id: id,
});
