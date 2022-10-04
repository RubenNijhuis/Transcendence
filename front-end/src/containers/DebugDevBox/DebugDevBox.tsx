import React from "react";
import Button from "../../components/Button";
import StoreId from "../../config/StoreId";
import { clearAll, getItem, setItem } from "../../modules/Store";
import { refreshAuthToken } from "../../proxies/auth/refreshToken";
import { setDefaultAuthHeader } from "../../proxies/instances/apiInstance";

const DebugDevBox = () => {
    const handleClearStorage = () => clearAll();

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
            console.error(
                `\nRefresh access token failed\nNo refresh in the store`
            );
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 18,
                left: 18,
                padding: 18,
                minHeight: 200,
                background: "rgb(230,230,230)",
                boxShadow: "0px 5px 5px rgba(30, 30, 30, 0.23)",
                borderRadius: 6,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                maxWidth: 216
            }}
        >
            <Button onClick={handleClearStorage}>Clear store</Button>
            <Button onClick={handleTokenRefresh}>Refresh access token</Button>
        </div>
    );
};

export default DebugDevBox;
