// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";

const getProfileByUserName = async (userName: string): Promise<ProfileType> => {
    try {
        const { data } = await API.get<ProfileType>(
            ApiRoutes.getProfileByUserName(userName)
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getProfileByUserName;
