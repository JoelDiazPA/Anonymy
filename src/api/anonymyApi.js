import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables()


const anonymyApi = axios.create({
    baseURL: VITE_API_URL
});

// todo: config interceptores
anonymyApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
} )


export default anonymyApi;