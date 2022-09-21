// Requests
import axios from "axios";

// Types
import { Profile } from "../../types/profile";
import { AuthTokenType } from "../../types/request";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Transform error
import transformToRequestError from "../utils/transformToRequestError";

const getUserByUsername = async (
    userName: string,
    authToken: AuthTokenType
): Promise<Profile> => {
    try {
        const { data } = await axios.get(
            ApiRoutes.getUserByUserName(userName),
            {
                headers: getAuthHeader(authToken)
            }
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getUserByUsername;
