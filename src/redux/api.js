import axios from '../middlewares/axios';
import consts from '../common/consts';

export const auth = ({ bearer }) => {
    return axios({method: 'GET', url: `${consts.urls.api}/auth/check`});
};
