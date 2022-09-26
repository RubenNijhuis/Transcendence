// API Request config
import ApiRoutes from "../../config/ApiRoutes";
import LocalStoreIdentifiers from "../../config/LocalStoreIdentifiers";


import { getItem } from "../../modules/LocalStore";
import { AuthTokenType } from "../../types/request";
import { API } from "../instances/apiInstance";

// Types
import transformToRequestError from "../utils/transformToRequestError";

const validateCredentials = async (
    authToken: AuthTokenType
): Promise<boolean> => {
    const tokens = getItem<AuthTokenType>(LocalStoreIdentifiers.authToken);
    try {
        const res = await API.get(ApiRoutes.validateCredentials(), {
            headers: {
                
            }
        });
        return Promise.resolve(true);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default validateCredentials;
