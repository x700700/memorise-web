import Axios from 'axios';
import consts from '../common/consts';

const axios = Axios.create({
    timeout: 10 * 1000,
    headers: {
        'Authorization': `Bearer ${consts.temp.bearer}`,
        'Content-Type': 'application/json',
    },
});

export const auth = ({ bearer }) => {
    return axios.get(`${consts.urls.api}/auth/check`)
        .then(response => response.data);
};
