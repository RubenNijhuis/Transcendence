// Types
import { ProfileType } from "../../types/profile";
import { AuthTokenType } from "../../types/request";

// Proxies
import { getUserByAccessToken } from "../user";
import { updateAuthTokens } from "../utils";
import { refreshAuthToken } from "./refreshAuthToken";

////////////////////////////////////////////////////////////

interface TokenValidityResponse {
    user: ProfileType;
    authToken: AuthTokenType;
}

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
        const response: TokenValidityResponse = {
            user: null!,
            authToken: null!
        };

        const authToken = await refreshAuthToken(refreshToken);

        updateAuthTokens(authToken);

        const userFromToken = await getUserByAccessToken(authToken.accessToken);

        response.user = userFromToken;
        response.authToken = authToken;

        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { checkTokenValidity };
