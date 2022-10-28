// Store
import StoreId from "../../config/StoreId";
import { setItem } from "../../modules/Store";

// Types
import { AuthTokenType } from "../../types/request";

// Proxies
import { setDefaultAuthHeader } from "../instances/apiInstance";

/**
 * Reset the store and update the API instance
 */
const updateAuthTokens = ({
    accessToken,
    refreshToken
}: AuthTokenType): void => {
    setItem(StoreId.accessToken, accessToken);
    setItem(StoreId.refreshToken, refreshToken);
    setDefaultAuthHeader(accessToken);
};
export { updateAuthTokens };
