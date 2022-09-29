// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";

const getUserByUsername = async (userName: string): Promise<ProfileType> => {
    try {
        const { data } = await API.get(ApiRoutes.getUserByUserName(userName));
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getUserByUsername;
