import StoreId from "../../config/StoreId";
import { clearAll, getItem, setItem } from "../../modules/Store";
import { refreshAuthToken } from "../../proxies/auth/refreshToken";
import { setDefaultAuthHeader } from "../../proxies/instances/apiInstance";
import { ProfileType } from "../../types/profile";

const handleClearStorage = () => clearAll();

const fillDBwithUsers = () => {};

const fillDBwithChats = (user: ProfileType) => {};

const handleTokenRefresh = () => {
    const storeRefreshToken = getItem<string>(StoreId.refreshToken);

    if (storeRefreshToken) {
        refreshAuthToken(storeRefreshToken)
            .then((newTokens) => {
                const { accessToken, refreshToken } = newTokens;

                // Reset tokens and API instance
                setItem(StoreId.accessToken, accessToken);
                setItem(StoreId.refreshToken, refreshToken);
                setDefaultAuthHeader(accessToken);
            })
            .catch((err) => console.error(err));
    } else {
        console.error(`\nRefresh access token failed\nNo refresh in the store`);
    }
};

export {
    handleClearStorage,
    fillDBwithChats,
    fillDBwithUsers,
    handleTokenRefresh
};
