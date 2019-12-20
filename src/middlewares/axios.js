import Axios from 'axios';
import logger from "../common/logger";
import consts from '../common/consts';

const axiosInstance = Axios.create({
    timeout: consts.env.timeout * 1000,
});

export default function (props, body) {
    logger.debug(`<<<<< ${props.method} - ${props.url}`, body);
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
        logger.debug('>>>>>', resp);
        return resp;
    }).catch(e => {
        logger.error('>!!!>', e.response);
        // eslint-disable-next-line no-throw-literal
        throw { ...e.response, message: e.message };
    });
};
