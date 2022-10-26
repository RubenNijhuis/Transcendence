// Store
import StoreId from "../../config/StoreId";
import { clearAll, getItem, setItem } from "../../modules/Store";

// Auth
import { refreshAuthToken } from "../../proxies/auth/refreshAuthToken";
import { setDefaultAuthHeader } from "../../proxies/instances/apiInstance";

// Types
import { ProfileType } from "../../types/profile";

////////////////////////////////////////////////////////////

const handleClearStorage = (): void => clearAll();

const fillDBwithUsers = (): void => {};

const fillDBwithChats = (user: ProfileType): void => {};

const handleTokenRefresh = async () => {
    const storeRefreshToken = getItem<string>(StoreId.refreshToken);

    ////////////////////////////////////////////////////////////

    if (!storeRefreshToken) {
        console.error(`\nRefresh access token failed\nNo refresh in the store`);
        return;
    }

    ////////////////////////////////////////////////////////////

    try {
        const newTokens = await refreshAuthToken(storeRefreshToken);

        const { accessToken, refreshToken } = newTokens;

        // Reset tokens and API instance
        setItem(StoreId.accessToken, accessToken);
        setItem(StoreId.refreshToken, refreshToken);
        setDefaultAuthHeader(accessToken);
    } catch (err) {
        console.log(err);
    }
};

export {
    handleClearStorage,
    fillDBwithChats,
    fillDBwithUsers,
    handleTokenRefresh
};
