import LocalStoreIdentifiers from "../../config/LocalStoreIdentifiers";
import { getItem } from "../../modules/LocalStore";
import { AuthTokenType } from "../../types/request";
import { API } from "../instances/apiInstance";

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

const refreshToken = (): AuthTokenType => {
    API.
};

const getAuthToken = (): AuthTokenType | null => {
    let token = getItem<AuthTokenType>(LocalStoreIdentifiers.authToken);

    if (token === null) return null;

    token = refreshToken();

    return token;
};

export { getAuthHeader, getAuthToken };
