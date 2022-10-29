// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";
import { addImagesToProfile } from "../profile/addImagesToProfile";
import { CreateUserParams } from "../../types/request";

/////////////////////////////////////////////////////////////

/**
 * Creates a user by sending the config to the back-end
 * @param userData
 * @returns
 */
const createUser = async (userData: CreateUserParams): Promise<ProfileType> => {
    try {
        const route = ApiRoutes.createUser();
        const { data } = await API.post<ProfileType>(route, userData);

        const profile = await addImagesToProfile(data, {
            profile: true,
            banner: true
        });

        return Promise.resolve(profile);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { createUser };
