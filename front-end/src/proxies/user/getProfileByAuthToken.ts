// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";
import { AuthTokenType } from "../../types/request";

const getUserByUserAuthToken = async (
    token: AuthTokenType
): Promise<ProfileType> => {
    try {
        const { data } = await API.get(ApiRoutes.getUserByToken(), {
            headers: { Authorization: `Bearer ${token.jsonWebToken}` }
        });
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getUserByUserAuthToken;
