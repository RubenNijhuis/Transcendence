// Requests
import axios from "axios";

// Types
import { Profile } from "../../types/profile";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Transform error
import transformToRequestError from "../utils/transformToRequestError";

const getUserByUsername = async (
    userName: string,
    authToken: string
): Promise<Profile> => {
    try {
        const res = await axios.get(ApiRoutes.getUserByUserName(userName), {
            headers: getAuthHeader(authToken)
        });
        const returnedProfile: Profile = res.data;
        return returnedProfile;
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getUserByUsername;
