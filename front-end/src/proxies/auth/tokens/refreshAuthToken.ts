// API config
import ApiRoutes from "../../../config/ApiRoutes";
import { API } from "../../instances/apiInstance";

// Types
import { Request } from "../../../types";
import { AxiosRequestConfig } from "axios";

////////////////////////////////////////////////////////////

/**
 * Checks auth token validity and upates if required, otherwise
 * reroutes the user to the home page to re-login
 */
const refreshAuthToken = async (
    refreshToken: string
): Promise<Request.AuthToken> => {
    try {
        const route = ApiRoutes.refreshAuthToken();
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        };

        const { data } = await API.get<Request.AuthToken>(route, config);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { refreshAuthToken };
