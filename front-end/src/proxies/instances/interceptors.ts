// Requst package
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Debug
import Logger from "../../utils/Logger";
import transformToRequestError from "../utils/transformToRequestError";

const SuccesRequestInterceptor = (
    request: AxiosRequestConfig
): AxiosRequestConfig => {
    Logger(
        "AUTH",
        "Err response interceptor",
        "Resetting credentials",
        request
    );
    return request;
};

const ErrorRequestInterceptor = (request: AxiosError): AxiosError => {
    Logger(
        "AUTH",
        "Err response interceptor",
        "Resetting credentials",
        request
    );
    return request;
};

// Request interceptor for auth credentials
const SuccesResponseInterceptor = (response: AxiosResponse) => {
    return response;
};

// Request interceptor for auth credentials
const ErrorResponseInterceptor = (err: AxiosError) => {
    // const token = getItem<AuthTokenType>(StoreIdentifiers.authToken);

    if (err.response) {
        if (err.response.status === 401) {
            Logger(
                "AUTH",
                "Err response interceptor",
                "Resetting credentials",
                err.response.status
            );
            // if (token) refreshAuthTokentoken);
        }
    }

    return transformToRequestError(err);
};

export {
    SuccesRequestInterceptor,
    ErrorRequestInterceptor,
    SuccesResponseInterceptor,
    ErrorResponseInterceptor
};
