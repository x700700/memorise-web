import axios from '../middlewares/axios';
import consts from '../common/consts';

export const auth = ({ bearer }) => {
    return axios({method: 'GET', url: `${consts.urls.api}/auth/check`});
};

export const trainingsList = ({ bearer }) => {
    return axios({method: 'GET', url: `${consts.urls.api}/trainings`});
};
