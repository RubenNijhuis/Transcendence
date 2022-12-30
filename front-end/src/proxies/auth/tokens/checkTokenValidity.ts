// Types
import * as Request from "../../../types/Request";

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
): Promise<Request.Response.TokenValidity> => {
    try {
        const authToken = await refreshAuthToken(refreshToken);

        updateAuthTokens(authToken);

        const profileFromToken = await getUserByAccessToken(
            authToken.accessToken
        );

        return Promise.resolve({ profile: profileFromToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { checkTokenValidity };
