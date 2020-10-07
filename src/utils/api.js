import Axios from 'axios';

const urlApi = {
    value: `http://167.172.154.78`
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
        config.headers.Authorization = "Bearer " + token;
    }

    return config
});

export default api;
