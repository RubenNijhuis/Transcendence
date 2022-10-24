// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

import addImagesToProfile from "./addImagesToProfile";

// Types
import { ProfileType } from "../../types/profile";
import { AxiosRequestConfig } from "axios";

////////////////////////////////////////////////////////////

const getUserByAccessToken = async (
    accessToken: string
): Promise<ProfileType> => {
    try {
        const route = ApiRoutes.getUserByAccessToken();
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const { data } = await API.get<ProfileType>(route, config);

        const returnedUser = await addImagesToProfile(data);

        return Promise.resolve(returnedUser);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getUserByAccessToken;
