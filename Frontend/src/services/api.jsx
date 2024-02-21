import axios from 'axios';
import JwtService from './JWTService';
import secrets from '../../secret';

const Axios = () => {
    let api = null;   

    if (JwtService.getToken('token')) {
        api = axios.create({
            baseURL: secrets.URL_DJANGO_REST_API,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${JwtService.getToken()}`
            }
        });
    } else if (localStorage.getItem('ref_token')) {
        api = axios.create({
            baseURL: secrets.URL_DJANGO_REST_API,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ref_token')}`
            }
        });
    } else {
    api = axios.create({    
        baseURL: secrets.URL_DJANGO_REST_API,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    }
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);
            return Promise.reject(error);
        }
    );
    return api;
}

export default Axios;
