import Axios from 'axios';

const BASE_URL = 'http://65.52.144.46:5000'

var axios = Axios;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get(endpoint, data) {
        return connectApi(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return connectApi(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return connectApi(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return connectApi(endpoint, 'DELETE', data)
    }
}

async function connectApi(endpoint, method = 'get', data = null) {
    // var token = localStorage.getItem('token');
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            headers:{
                // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data'
            } ,
            data,
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${JSON.stringify(data)}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
            window.location.assign('/#/signup');
        }
        throw err;
    }
}