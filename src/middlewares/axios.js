import Axios from 'axios';
import consts from '../common/consts';

const axiosInstance = Axios.create({
    timeout: 10 * 1000,
    headers: {
        'Authorization': `Bearer ${consts.temp.bearer}`,
        'Content-Type': 'application/json',
    },
});

export default function (props) {
    console.log(`>>> ${props.method} - ${props.url}`);
    return axiosInstance(props).then(response => response.data);
};
