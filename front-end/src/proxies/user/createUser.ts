// Request
import axios from "axios";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Types
import { Profile } from "../../types/profile";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";
import transformToRequestError from "../utils/transformToRequestError";
import { AuthTokenType } from "../../types/request";

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

const createUser = async (
    userData: createUserProps,
    authToken: AuthTokenType
): Promise<Profile> => {
    try {
        const { data } = await axios.post<Profile>(
            ApiRoutes.createUser(),
            userData,
            {
                headers: getAuthHeader(authToken)
            }
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default createUser;
