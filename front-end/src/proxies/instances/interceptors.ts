// Requst package
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// import StoreId from "../../config/StoreId";
// import { getItem } from "../../modules/Store";

/**
 * This interceptor handles requests that went succesfully
 * @param request
 * @returns
 */
const SuccesRequestInterceptor = (
    request: AxiosRequestConfig
): AxiosRequestConfig=> {
    return request;
};

/**
 * This interceptor handles the case where a request was not sent properly
 * @param request
 * @returns
 */
const ErrorRequestInterceptor = (request: AxiosError): AxiosError => {
    throw request;
};

/**
 * This interceptor get triggered if a response is succesful (status-code: 2xx)
 * @param response A succesful response
 * @returns the initial response
 */
const SuccesResponseInterceptor = (response: AxiosResponse) => {
    /**
     * Authentication errors should als be returned as errors, therefore
     */
    if (response.data.status >= 400 && response.data.status <= 499) {
        throw response;
    }
    return response;
};

/**
 * This interceptor takes a request error and transforms it
 * to the one we have standardized. Also handles certain
 * specific errors regarding auth.
 *
 * TODO: if a response is because a token is invalid try
 * once to refresh otherwise redirect to the login page
 *
 * @param err request error
 * @returns a transformed request error
 */
const ErrorResponseInterceptor = (err: AxiosError) => {
    if (err.response) {
        if (err.response.status === 401) {
        }
    }

    throw err;
};

export {
    SuccesRequestInterceptor,
    ErrorRequestInterceptor,
    SuccesResponseInterceptor,
    ErrorResponseInterceptor
};
