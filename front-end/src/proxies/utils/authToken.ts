// Store
import StoreIdentifiers from "../../config/StoreIdentifiers";
import { getItem } from "../../modules/Store";

// Types
import { AuthTokenType } from "../../types/request";

// API
import { API } from "../instances/apiInstance";

/**
 * Checks auth token validity and upates if required, otherwise reroutes the user to the home page to re-login
 */
const refreshToken = async (token: AuthTokenType): Promise<AuthTokenType> => {
    try {
        const { data } = await API.get<AuthTokenType>("/api/auth/refresh", {
            headers: {
                Authorization: `Bearer ${token.refreshToken}`
            }
        });
        return Promise.resolve(data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

const getAuthToken = (): AuthTokenType | null => {
    let token = getItem<AuthTokenType>(StoreIdentifiers.authToken);

    if (token === null) return null;

    return token;
};

export { getAuthToken, refreshToken };
