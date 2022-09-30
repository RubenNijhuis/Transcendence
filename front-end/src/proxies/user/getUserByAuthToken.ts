// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";
import { AuthTokenType } from "../../types/request";

const getUserByAuthToken = async (
    token: AuthTokenType
): Promise<ProfileType> => {
    try {
        const { data } = await API.get(ApiRoutes.getUserByAuthToken(), {
            headers: { Authorization: `Bearer ${token.accessToken}` }
        });
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getUserByAuthToken;
