import axios from "axios";


export const saveTokens = (access: string, refresh: string) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
}
export const axiosReguest = axios.create({
    baseURL: import.meta.env.VITE_API, 
})

export const getToken = () =>{
    return localStorage.getItem("access");
};

axiosReguest.interceptors.request.use(config => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
}, error => {
    return Promise.reject(error);
});