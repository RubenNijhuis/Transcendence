import { AxiosError } from "axios";
import { RequestError } from "../../types/GlobalTypes";

const transformToRequestError = (err: AxiosError): RequestError => {
    const returnedError: RequestError = {
        error: {},
        type: ""
    };

    if (err.response) {
        // The client was given an error response (5xx, 4xx)
        returnedError.type = "response-error";
        returnedError.error = err.response.data;
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
