import PageRoutes from "../../config/PageRoutes";
import StoreIdentifiers from "../../config/StoreIdentifiers";
import { getItem } from "../../modules/Store";
import { AuthTokenType } from "../../types/request";
import { API } from "../instances/apiInstance";

/**
 * Returns a formatted authorization header.
 * Uses
 */
const getAuthHeader = () => {
    let header = { Authorization: `` };
    const token = getItem<AuthTokenType>(StoreIdentifiers.authToken);

    if (token !== null) {
        header.Authorization = `Bearer ${token.jsonWebToken}`;
    }

    return header;
};

/**
 * Checks auth token validity and upates if required, otherwise reroutes the user to the home page to re-login
 */
const refreshToken = async () => {
    const token = getItem<AuthTokenType>(StoreIdentifiers.authToken);

    if (token === null) {
        // if (window.location.pathname !== PageRoutes.home) {
        //     window.location.assign(PageRoutes.home);
        // }
    } else {
        try {
            const { data } = await API.get("/api/refresh", {
                headers: {
                    Authorization: `Bearer ${token.refreshToken}`
                }
            });
            console.log("Refresh Data: ", data);
        } catch (err) {
            console.log(err);
        }
    }
};

const getAuthToken = (): AuthTokenType | null => {
    let token = getItem<AuthTokenType>(StoreIdentifiers.authToken);

    if (token === null) return null;

    return token;
};

export { getAuthHeader, getAuthToken, refreshToken };
