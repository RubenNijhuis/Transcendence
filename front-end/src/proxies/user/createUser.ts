// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";
import transformToRequestError from "../utils/transformToRequestError";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Types
import { ProfileType } from "../../types/profile";
import { AuthTokenType } from "../../types/request";

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

const createUser = async (
    userData: createUserProps,
    authToken: AuthTokenType
): Promise<ProfileType> => {
    try {
        const { data } = await API.post<ProfileType>(
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
