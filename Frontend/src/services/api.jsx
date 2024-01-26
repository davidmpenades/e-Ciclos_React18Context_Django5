import axios from 'axios';

const Axios = () => {
    let api = null;
    api = axios.create({
        baseURL: 'http://0.0.0.0:8000',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    // api.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         console.log(error);
    //         return Promise.reject(error);
    //     }
    // );
    return api;
}

export default Axios;
