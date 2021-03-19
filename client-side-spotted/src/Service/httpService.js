import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ?
    '' :
    '//localhost:8081'
// const BASE_URL = process.env.NODE_ENV === 'localhost:8080/'


var axios = Axios;

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
    var token = localStorage.getItem('token');
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            headers:{
                'x-token': token 
            } ,
            data,
            withCredentials: true,
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