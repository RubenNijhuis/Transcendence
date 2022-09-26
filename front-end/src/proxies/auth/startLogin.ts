// API Request config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import transformToRequestError from "../utils/transformToRequestError";

const startLogin = async (): Promise<string> => {
    try {
        const { data } = await API.get(ApiRoutes.getLoginRoute());
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default startLogin;
