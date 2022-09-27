import { AuthTokenType } from "../../types/request";

/**
 * Returns a formatted authorization header.
 * Uses
 */
const getAuthHeader = (authToken: AuthTokenType) => {
    const header = {
        Authorization: `Bearer ${authToken.jsonWebToken}`
    };

    return header;
};

export { getAuthHeader };
