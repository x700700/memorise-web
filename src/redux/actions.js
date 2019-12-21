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

export const appAuth = ({ authErrorMessage, signinErrorMessage, signupErrorMessage, friendErrorMessage }) => ({
    type: types.saga.auth,
    authErrorMessage: authErrorMessage,
    signinErrorMessage: signinErrorMessage,
    signupErrorMessage: signupErrorMessage,
    friendErrorMessage: friendErrorMessage,

});



export const getTrainingsList = () => ({
    type: types.saga.getTrainingsList,
});
export const getFriendTrainingsList = (friendName) => ({
    type: types.saga.getFriendTrainingsList,
    friendName: friendName,
});



export const getEditTraining = (id) => ({
    type: types.saga.getEditTraining,
    id: id,
});
export const getGameTraining = (id, friendName) => ({
    type: types.saga.getGameTraining,
    id: id,
    friendName: friendName
});
export const getExamTraining = (id, friendName) => ({
    type: types.saga.getExamTraining,
    id: id,
    friendName: friendName,
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

export const saveExercise = (trainingId, id, exercise) => ({
    type: types.saga.saveExercise,
    trainingId: trainingId,
    id: id,
    body: exercise,
});

export const deleteExercise = (trainingId, id) => ({
    type: types.saga.deleteExercise,
    trainingId: trainingId,
    id: id,
});

export const getTranslate = (word) => ({
    type: types.saga.getTranslate,
    body: {
        word,
    },
});
