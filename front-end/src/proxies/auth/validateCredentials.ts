// API Request config
import ApiRoutes from "../../config/ApiRoutes";

import { AuthTokenType } from "../../types/request";
import { API } from "../instances/apiInstance";

// Types
import transformToRequestError from "../utils/transformToRequestError";

const validateCredentials = async (
    authToken: AuthTokenType
): Promise<boolean> => {
    try {
        const res = await API.get(ApiRoutes.validateCredentials());
        return Promise.resolve(true);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default validateCredentials;
