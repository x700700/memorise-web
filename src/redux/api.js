import axios from '../middlewares/axios';
import consts from '../common/consts';

export const signin = ({ body }) => {
    return axios({method: 'POST', url: `${consts.urls.api}/auth/login`}, body);
};

export const signup = ({ body }) => {
    return axios({method: 'POST', url: `${consts.urls.api}/auth/register`}, body);
};

export const auth = ({ bearer }) => {
    return axios({method: 'GET', url: `${consts.urls.api}/auth/check`});
};


export const getTranslate = ({ bearer, body }) => {
    return axios({method: 'POST', url: `${consts.urls.api}/service/translate`}, body);
};



export const trainingsList = ({ bearer }) => {
    return axios({method: 'GET', url: `${consts.urls.api}/trainings`});
};

export const friendTrainingsList = ({ bearer, friendName }) => {
    return axios({method: 'GET', url: `${consts.urls.api}/friend/${friendName}/trainings`});
};



export const getTraining = ({ bearer, id }) => {
    return axios({method: 'GET', url: `${consts.urls.api}/trainings/${id}`});
};

export const getFriendTraining = ({ bearer, friendName, id }) => {
    return axios({method: 'GET', url: `${consts.urls.api}/friend/${friendName}/trainings/${id}`});
};


export const createTraining = ({ bearer }) => {
    return axios({method: 'POST', url: `${consts.urls.api}/trainings`});
};

export const renameTraining = ({ bearer, id, body }) => {
    return axios({method: 'PUT', url: `${consts.urls.api}/trainings/${id}`}, body);
};

export const deleteTraining = ({ bearer, id }) => {
    return axios({method: 'DELETE', url: `${consts.urls.api}/trainings/${id}`});
};


export const createExercise = ({ bearer, trainingId }) => {
    return axios({method: 'POST', url: `${consts.urls.api}/trainings/${trainingId}/exercises`});
};

export const saveExercise = ({ bearer, trainingId, id, body }) => {
    return axios({method: 'PUT', url: `${consts.urls.api}/trainings/${trainingId}/exercises/${id}`}, body);
};

export const deleteExercise = ({ bearer, trainingId, id }) => {
    return axios({method: 'DELETE', url: `${consts.urls.api}/trainings/${trainingId}/exercises/${id}`});
};
