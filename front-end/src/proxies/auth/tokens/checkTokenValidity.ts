// Types
import { TokenValidityResponse } from "../../../types/request";

// Proxies
import { getUserByAccessToken } from "../../user";
import { updateAuthTokens } from "../../utils";
import { refreshAuthToken } from "./refreshAuthToken";

////////////////////////////////////////////////////////////

/**
 * Checks if the token is still valid and returns the user attached
 * to the token if true
 * @param refreshToken
 * @returns
 */
const checkTokenValidity = async (
    refreshToken: string
): Promise<TokenValidityResponse> => {
    try {
        const authToken = await refreshAuthToken(refreshToken);

        updateAuthTokens(authToken);

        const userFromToken = await getUserByAccessToken(authToken.accessToken);

        return Promise.resolve({ user: userFromToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { checkTokenValidity };
