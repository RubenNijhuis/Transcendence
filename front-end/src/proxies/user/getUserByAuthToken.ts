// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";

const getUserByAuthToken = async (
    accessToken: string
): Promise<ProfileType> => {
    try {
        const { data } = await API.get(ApiRoutes.getUserByAuthToken(), {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getUserByAuthToken;
