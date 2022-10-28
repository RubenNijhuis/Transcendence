// API config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { AuthTokenType } from "../../types/request";

////////////////////////////////////////////////////////////

/**
 * Checks auth token validity and upates if required, otherwise
 * reroutes the user to the home page to re-login
 */
const refreshAuthToken = async (
    refreshToken: string
): Promise<AuthTokenType> => {
    try {
        const route = ApiRoutes.refreshAuthToken();
        const config = {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        };

        const { data } = await API.get<AuthTokenType>(route, config);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { refreshAuthToken };
