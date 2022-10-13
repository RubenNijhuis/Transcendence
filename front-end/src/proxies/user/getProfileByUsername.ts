// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";

const getProfileByUserName = async (userName: string): Promise<ProfileType> => {
    try {
        const res = await API.get<ProfileType>(
            ApiRoutes.getProfileByUserName(userName)
        );

        console.log(res);

        return Promise.resolve(res.data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getProfileByUserName;
