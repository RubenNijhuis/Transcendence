import { AxiosError } from "axios";
import { RequestErrorType } from "../../types/request";

/**
 * Transforms an Axios request error into a RequestErrorType type
 * @param err The request error
 * @returns RequestErrorType
 */
const transformToRequestError = (err: AxiosError): RequestErrorType => {
    const returnedError: RequestErrorType = {
        error: JSON.stringify(err, null, 4).replace(/"/g, ""),
        type: "",
        requestUrl: err.request.responseURL
    };

    if (err.response) {
        // The client was given an error response (5xx, 4xx)
        returnedError.type = "response-error";
    } else if (err.request) {
        // The client never received a response, and the request was never left
        returnedError.type = "request-error";
    } else {
        // Some other kind of error was found
        returnedError.type = "undefine-error";
    }

    return returnedError;
};

export default transformToRequestError;
