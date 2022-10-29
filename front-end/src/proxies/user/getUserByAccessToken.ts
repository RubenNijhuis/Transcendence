// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

import { addImagesToProfile } from "../profile/addImagesToProfile";

// Types
import { ProfileType } from "../../types/profile";
import { AxiosRequestConfig } from "axios";

////////////////////////////////////////////////////////////

/**
 * Retrieves a user based on their auth token
 * @param accessToken
 * @returns
 */
const getUserByAccessToken = async (
    accessToken: string
): Promise<ProfileType> => {
    try {
        const route = ApiRoutes.getUserByAccessToken();
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const { data } = await API.get<ProfileType>(route, config);

        const returnedUser = await addImagesToProfile(data, {
            profile: true,
            banner: true
        });

        return Promise.resolve(returnedUser);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { getUserByAccessToken };
