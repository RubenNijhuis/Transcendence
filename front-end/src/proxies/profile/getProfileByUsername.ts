// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";
import { addImagesToProfile } from "./addImagesToProfile";
import { ImageSelect } from "../../types/request";

////////////////////////////////////////////////////////////

/**
 * Retrieves a profile based on the username
 * @param username
 * @returns
 */
const getProfileByUsername = async (
    username: string,
    imageSelect: ImageSelect
): Promise<ProfileType> => {
    try {
        const route = ApiRoutes.getProfileByUsername(username);

        const { data } = await API.get<ProfileType>(route);

        const profile = addImagesToProfile(data, imageSelect);

        return Promise.resolve(profile);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { getProfileByUsername };
