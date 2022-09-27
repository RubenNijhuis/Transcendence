import axios, { AxiosError, AxiosResponse } from "axios";
import Logger from "../../utils/Logger";
import { getAuthToken, refreshToken } from "../utils/authToken";

// Instance
const API = axios.create({
    baseURL: "http://127.0.0.1:8080/api/"
});

/**
 * Set the default authorization header. If the user can't
 * refresh their token or has never logged in it won't be set.
 */
const setDefaultAuthHeader = () => {
    const token = getAuthToken();

    if (token !== null) {
        console.log("YES");
        API.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token.jsonWebToken}`;
    } else {
        console.log("NEIN");
        refreshToken();
    }
};

// Iffe because no other way to run it i think
(() => setDefaultAuthHeader())();

// Request interceptor for auth credentials
const SuccesResponseInterceptor = (response: AxiosResponse) => {
    console.log("✅ AUTH SUCCES", response);
    return response;
};

// Request interceptor for auth credentials
const ErrorResponseInterceptor = (err: AxiosError) => {
    if (err.response) {
        if (err.response.status === 401) {
            Logger(
                "AUTH",
                "Err response interceptor",
                "Resetting credentials",
                err.response.status
            );
            refreshToken();
        }
    }
    return err;
};

// Setup AuthInterceptor to be used
API.interceptors.response.use(
    SuccesResponseInterceptor,
    ErrorResponseInterceptor
);

export { API };
