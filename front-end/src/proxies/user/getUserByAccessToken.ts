// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

import { addImagesToProfile } from "../profile/addImagesToProfile";

// Types
import { Profile } from "../../types";
import { AxiosRequestConfig } from "axios";

////////////////////////////////////////////////////////////

/**
 * Retrieves a user based on their auth token
 * @param accessToken
 * @returns
 */
const getUserByAccessToken = async (
    accessToken: string
): Promise<Profile.Instance> => {
    try {
        const route = ApiRoutes.getUserByAccessToken();
        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const { data } = await API.get<Profile.Instance>(route, config);

        const returnedUser = await addImagesToProfile(data, {
            profile: true,
            banner: true
        });

        return Promise.resolve(returnedUser);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getUserByAccessToken };
