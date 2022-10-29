// Store
import StoreId from "../../config/StoreId";
import { clearAll, getItem } from "../../modules/Store";

// Auth
import { refreshAuthToken } from "../../proxies/auth/refreshAuthToken";
import { API } from "../../proxies/instances/apiInstance";
import { updateAuthTokens } from "../../proxies/utils";

// Types
import { ProfileType } from "../../types/profile";

////////////////////////////////////////////////////////////

const handleClearStorage = (): void => clearAll();

const fillDBwithUsers = (): void => {};

const fillDBwithChats = (user: ProfileType): void => {};

const makeFriends = async (user: ProfileType) => {
    try {
        const makeFriendResp = await API.post("/seeder/amount", {
            amount: 10
        });

        console.log(makeFriendResp);
    } catch (err) {
        console.error(err);
    }
};

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

        updateAuthTokens(newTokens);
    } catch (err) {
        console.error(err);
    }
};

export {
    handleClearStorage,
    fillDBwithChats,
    fillDBwithUsers,
    handleTokenRefresh,
    makeFriends
};
