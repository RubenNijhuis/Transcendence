// Requests
import axios, { AxiosError, AxiosResponse } from "axios";

// Store
import StoreIdentifiers from "../../config/StoreIdentifiers";
import { getItem } from "../../modules/Store";

// Types
import { AuthTokenType } from "../../types/request";

// Auth
import { refreshToken } from "../utils/authToken";

// Debug
import Logger from "../../utils/Logger";

// Instance
const API = axios.create({
    baseURL: "http://127.0.0.1:8080/api/"
});

/**
 * Set the default authorization header. If the user can't
 * refresh their token or has never logged in it won't be set.
 */
const setDefaultAuthHeader = (token: AuthTokenType) => {
    API.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token.jsonWebToken}`;
};

// Request interceptor for auth credentials
const SuccesResponseInterceptor = (response: AxiosResponse) => {
    console.log("✅ AUTH SUCCES", response);
    return response;
};

// Request interceptor for auth credentials
const ErrorResponseInterceptor = (err: AxiosError) => {
    const token = getItem<AuthTokenType>(StoreIdentifiers.authToken);

    if (err.response) {
        if (err.response.status === 401) {
            Logger(
                "AUTH",
                "Err response interceptor",
                "Resetting credentials",
                err.response.status
            );
            if (token) refreshToken(token);
        }
    }
    return err;
};

// Setup AuthInterceptor to be used
API.interceptors.response.use(
    SuccesResponseInterceptor,
    ErrorResponseInterceptor
);

export { API, setDefaultAuthHeader };
