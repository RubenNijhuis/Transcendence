// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";
import addImagesToProfile from "./addImagesToProfile";

const getUserByAccessToken = async (
    accessToken: string
): Promise<ProfileType> => {
    try {
        const { data } = await API.get(ApiRoutes.getUserByAccessToken(), {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const returnedUser = await addImagesToProfile(data);
        return Promise.resolve(returnedUser);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getUserByAccessToken;
