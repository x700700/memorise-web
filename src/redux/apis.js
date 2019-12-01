import axios from 'axios';
import consts from '../common/consts';

export const auth = ({ bearer }) => {
    return axios.get(`${consts.urls.api}/auth/check`, {
        headers: {
            'Authorization': `Bearer ${consts.temp.bearer}`,
            'Content-Type': 'application/json',
        }
    }).then(response => {
        console.warn('hey 1 - ', response);
        return response.data;
    });
};
