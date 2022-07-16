import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://river-fuler.space/api/',
    //baseURL: 'http://127.0.0.1:9090/api/',
});
const getToken = () =>{
    return localStorage.getItem('token');
};

export const defaultOptions = () => {
    const token = getToken();
    return {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
};
export const serverImageUrl = "https://river-fuler.space/images/";