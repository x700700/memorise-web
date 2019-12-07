import Axios from 'axios';
import consts from '../common/consts';

const axiosInstance = Axios.create({
    timeout: consts.env.timeout * 1000,
    headers: {
        'Authorization': `Bearer ${consts.temp.bearer}`,
        'Content-Type': 'application/json',
    },
});

export default function (props, body) {
    console.log(`<<<<< ${props.method} - ${props.url}`, body);
    return axiosInstance({...props, data: body }).then(response => {
        const resp = response.data;
        console.warn('>>>>>', resp);
        return resp;
    });
};
