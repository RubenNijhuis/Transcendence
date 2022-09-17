// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Requests
import axios from "axios";

// Types
import transformToRequestError from "../utils/transformToRequestError";

const startLogin = async (): Promise<string> => {
    try {
        const res = await axios
            .get(ApiRoutes.getLoginRoute());
        const returnedUrl: string = res.data;
        return returnedUrl;
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default startLogin;
