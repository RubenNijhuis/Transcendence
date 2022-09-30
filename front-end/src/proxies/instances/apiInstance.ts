// Requests
import axios from "axios";

// Request/Response Interceptors
import {
    SuccesRequestInterceptor,
    ErrorRequestInterceptor,
    SuccesResponseInterceptor,
    ErrorResponseInterceptor
} from "./interceptors";

// Types
import { AuthTokenType } from "../../types/request";

// TODO: put api instance in a folder with its parts

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

// Setup request interceptors
API.interceptors.request.use(SuccesRequestInterceptor, ErrorRequestInterceptor);

// Setup response interceptors
API.interceptors.response.use(
    SuccesResponseInterceptor,
    ErrorResponseInterceptor
);

export { API, setDefaultAuthHeader };
