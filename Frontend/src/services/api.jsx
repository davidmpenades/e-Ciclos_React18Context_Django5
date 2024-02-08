import axios from 'axios';
import JwtService from './JWTService';

const Axios = () => {
    let api = null;   

    if (JwtService.getToken('token')) {
        console.log('Token found');
        api = axios.create({
            baseURL: 'http://0.0.0.0:8000',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${JwtService.getToken()}`
            }
        });
    } else if (localStorage.getItem('ref_token')) {
        api = axios.create({
            baseURL: 'http://0.0.0.0:8000',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ref_token')}`
            }
        });
    } else {
        console.log('No token found');
    api = axios.create({    
        baseURL: 'http://0.0.0.0:8000',
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
