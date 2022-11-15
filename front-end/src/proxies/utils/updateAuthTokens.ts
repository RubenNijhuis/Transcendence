// Store
import StoreId from "../../config/StoreId";
import { setItem } from "../../modules/Store";

// Types
import { Request } from "../../types";

// Proxies
import { setDefaultAuthHeader } from "../instances/apiInstance";

///////////////////////////////////////////////////////////

/**
 * Reset the store and update the API instance
 */
const updateAuthTokens = ({
    accessToken,
    refreshToken
}: Request.AuthToken): void => {
    setItem(StoreId.accessToken, accessToken);
    setItem(StoreId.refreshToken, refreshToken);
    setDefaultAuthHeader(accessToken);
};

///////////////////////////////////////////////////////////

export { updateAuthTokens };
