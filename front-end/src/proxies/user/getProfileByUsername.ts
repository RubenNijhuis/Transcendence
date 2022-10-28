// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";

////////////////////////////////////////////////////////////

/**
 * Retrieves a profile based on the username
 * @param username
 * @returns
 */
const getProfileByUsername = async (username: string): Promise<ProfileType> => {
    try {
        const route = ApiRoutes.getProfileByUsername(username);

        const { data } = await API.get<ProfileType>(route);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { getProfileByUsername };
