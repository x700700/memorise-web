import * as types from './actionsTypes';

export const signin = ({ nickName, password }) => ({
    type: types.saga.signin,
    body: {
        nickName: nickName,
        password: password,
    },
});

export const signup = ({ email, nickName, password }) => ({
    type: types.saga.signup,
    body: {
        email: email,
        nickName: nickName,
        password: password,
    },
});

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
export const getGameTraining = (id) => ({
    type: types.saga.getGameTraining,
    id: id,
});
export const getExamTraining = (id) => ({
    type: types.saga.getExamTraining,
    id: id,
});


export const createTraining = () => ({
    type: types.saga.createTraining,
});

export const renameTraining = (id, name) => ({
    type: types.saga.renameTraining,
    id: id,
    body: {
        name: name,
    }
});

export const deleteTraining = (id) => ({
    type: types.saga.deleteTraining,
    id: id,
});


export const createExercise = (trainingId) => ({
    type: types.saga.createExercise,
    trainingId: trainingId,
});

export const saveExercise = (trainingId, Id, id, exercise) => ({
    type: types.saga.saveExercise,
    trainingId: trainingId,
    id: id,
    body: {
        exercise: exercise,
    }
});

export const deleteExercise = (trainingId, id) => ({
    type: types.saga.deleteExercise,
    trainingId: trainingId,
    id: id,
});
