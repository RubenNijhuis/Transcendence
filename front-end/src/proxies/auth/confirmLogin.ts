// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Requests
import axios from "axios";

// Types
import { LoginConfirmResponse } from "../../types/request";

// Error transformer
import transformToRequestError from "../utils/transformToRequestError";

const confirmLogin = async (
    code: string
): Promise<LoginConfirmResponse> => {
    try {
        const { data } = await axios.get(ApiRoutes.confirmLogin(code));
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default confirmLogin;
