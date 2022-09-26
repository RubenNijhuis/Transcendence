// API request setup
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";
import transformToRequestError from "../utils/transformToRequestError";

// Types
import { LoginConfirmResponse } from "../../types/request";

const confirmLogin = async (
    code: string
): Promise<LoginConfirmResponse> => {
    try {
        const { data } = await API.get(ApiRoutes.confirmLogin(code));
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default confirmLogin;
