import Axios from 'axios';

const urlApi = {
    value: `http://18.204.9.14:3333`
};

const api = Axios.create({
    baseURL: urlApi.value,
    responseType: "json",
    headers: { "Content-Type": "application/json"},
    timeout: 40000
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token) {
        config.headers.Authorization = token;
    }
});

export default api;
