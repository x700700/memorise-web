import Axios from 'axios';
import consts from '../common/consts';

const axiosInstance = Axios.create({
    timeout: consts.env.timeout * 1000,
});

export default function (props, body) {
    console.log(`<<<<< ${props.method} - ${props.url}`, body);
    const jwt = localStorage.getItem(consts.localStorage.tokenId);
    return axiosInstance({
        ...props,
        data: body,
        headers: {
            'Authorization': jwt ? `Bearer ${jwt}` : '',
            'Content-Type': 'application/json',
        },
    }).then(response => {
        const resp = response.data;
        console.warn('>>>>>', resp);
        return resp;
    }).catch(e => {
        console.error('>!!!>', e.response);
        throw { ...e.response, message: e.message };
    });
};
