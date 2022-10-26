// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";

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

        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export { createUser };
