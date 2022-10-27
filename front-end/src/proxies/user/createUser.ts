// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";
import { addImagesToProfile } from "./addImagesToProfile";

/////////////////////////////////////////////////////////////

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

/**
 * Creates a user by sending the config to the back-end
 * @param userData
 * @returns
 */
const createUser = async (userData: createUserProps): Promise<ProfileType> => {
    try {
        const route = ApiRoutes.createUser();
        const { data } = await API.post<ProfileType>(route, userData);

        const profile = await addImagesToProfile(data);
        return Promise.resolve(profile);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { createUser };
