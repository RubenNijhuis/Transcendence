// Requests
import axios from "axios";

// Types
import { ProfileType } from "../../types/profile";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Transform error
import transformToRequestError from "../utils/transformToRequestError";

const getUserByUsername = async (userName: string): Promise<ProfileType> => {
    try {
        const { data } = await axios.get(ApiRoutes.getUserByUserName(userName));
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getUserByUsername;
