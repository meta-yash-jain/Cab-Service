import axios from 'axios';
import { begin, error, success } from './actions';

const fetchContent = (options) => {
    const requestOptions = Object.assign({}, {
        baseURL: 'http://localhost:3000/api/',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }, options);

    return dispatch => {
        dispatch(begin(requestOptions.method));
        return axios.request(requestOptions)
            .then(res => {
                return dispatch(success(requestOptions.method, res.data));
            })
            .catch(err => {
                return dispatch(error(requestOptions.method, err));
            });
    };
}

const get = () => {
    return fetchContent({
        method: 'get',
        url: '/bookings'
    });
};

const post = (data) => {
    return fetchContent({
        method: 'post',
        url: '/toBook',
        data
    });
};

const nearBy = (id, data) => {
    return fetchContent({
        method: 'get',
        url: `/nearBy?location=${id}`,
        data
    });
};

export default {
    get,
    post,
    nearBy
}
