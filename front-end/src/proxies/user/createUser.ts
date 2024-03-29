// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// API Requests
import { addImagesToProfile } from "../profile/addImagesToProfile";

// Types
import * as Request from "../../types/Request";
import * as Profile from "../../types/Profile";

/////////////////////////////////////////////////////////////

/**
 * Creates a user by sending the config to the back-end
 * @param userData
 * @returns
 */
const createUser = async (
    userData: Request.Payload.CreateUser
): Promise<Profile.Instance> => {
    try {
        const route = ApiRoutes.createUser();
        const { data } = await API.post<Profile.Instance>(route, userData);
        
        const profile = await addImagesToProfile(data, {
            profile: true,
            banner: true,
        });

        return Promise.resolve(profile);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { createUser };
