// API
import { API, apiRequestConfig } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Image transform
import { Buffer } from "buffer";

/////////////////////////////////////////////////////////////

/**
 * Retrieves the profile banner by username
 * @param username
 * @returns
 */
const getProfileBannerByUsername = async (
    username: string
): Promise<string> => {
    try {
        const route = ApiRoutes.getProfileBannerByUsername(username);
        
        return Promise.resolve(route);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getProfileBannerByUsername };
