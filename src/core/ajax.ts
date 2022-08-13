import axios, { AxiosInstance } from 'axios';

const createAjax = (): AxiosInstance => {
    const defaultConfig = {
        headers: Object.assign({
            'X-Requested-With': 'XMLHttpRequest'
        }),
        withCredentials: false
    };

    const instance = axios.create(defaultConfig);

    return instance;
};

export default createAjax();
