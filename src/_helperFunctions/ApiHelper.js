import axios from "axios";
import Logout from "../_helperFunctions/Logout";

const ApiHelper = () =>{

    let apiHelper = axios.create();

    apiHelper.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization =  `Bearer ${token}`;
        }

        return config;
    });

    apiHelper.interceptors.response.use((response) => {
        return response;
    }, err => {
        if (err?.response?.status == 401) {
            Logout()
        }
    });

    return apiHelper;
}

export default ApiHelper()