// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Requests
import axios from "axios";

// Types
import { LoginConfirmResponse } from "../../types/GlobalTypes";
import transformToRequestError from "../utils/transformToRequestError";

const confirmLogin = async (
    code: string
): Promise<LoginConfirmResponse> => {
    try {
        const loginConfirmResp = await axios.get(ApiRoutes.confirmLogin(code));
        const returnedData: LoginConfirmResponse = loginConfirmResp.data;
        return Promise.resolve(returnedData);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default confirmLogin;
