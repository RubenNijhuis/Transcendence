// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Requests
import axios from "axios";

// Types
import transformToRequestError from "../utils/transformToRequestError";

const startLogin = async (): Promise<string> => {
    try {
        const { data } = await axios.get(ApiRoutes.getLoginRoute());
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default startLogin;
