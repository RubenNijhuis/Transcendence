// Requests
import axios, { AxiosRequestConfig } from "axios";
import ApiRoutes from "../../config/ApiRoutes";

// Request/Response Interceptors
import {
    SuccesRequestInterceptor,
    ErrorRequestInterceptor,
    SuccesResponseInterceptor,
    ErrorResponseInterceptor,
} from "./interceptors";

////////////////////////////////////////////////////////////

type apiRequestConfig = AxiosRequestConfig;

// Instance
const API = axios.create({
    baseURL: ApiRoutes.baseUrl(),
});

/**
 * Set the default authorization header. If the user can't
 * refresh their token or has never logged in it won't be set.
 */
const setDefaultAuthHeader = (accessToken: string): void => {
    API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// Setup request interceptors
API.interceptors.request.use(SuccesRequestInterceptor, ErrorRequestInterceptor);

// Setup response interceptors
API.interceptors.response.use(
    SuccesResponseInterceptor,
    ErrorResponseInterceptor
);

///////////////////////////////////////////////////////////

export { API, setDefaultAuthHeader };
export type { apiRequestConfig };
