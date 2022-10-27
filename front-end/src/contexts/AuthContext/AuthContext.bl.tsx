// API
import { confirmLogin } from "../../proxies/auth";

// Types
import { SignInResponse } from "../../types/request";

// Routing
import PageRoutes from "../../config/PageRoutes";

// Store
import { removeItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Utils
import { updateAuthTokens } from "../../proxies/utils";

////////////////////////////////////////////////////////////

/**
 * Makes a request to the back-end using the third party provided
 * code. The expected return value is a user as well as a bool
 * indicating whether to create a user or not.
 */
const signIn = async (code: string): Promise<SignInResponse> => {
    try {
        const { authToken, profile, shouldCreateUser } = await confirmLogin(
            code
        );

        updateAuthTokens(authToken);

        return Promise.resolve({ profile, shouldCreateUser });
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Signs the user off, removing auth tokens and
 * redirecting to the home page
 */
const signOut = (): void => {
    removeItem(StoreId.accessToken);
    removeItem(StoreId.refreshToken);
    redirectToHome();
};

const redirectToHome = (): void => {
    if (window.location.pathname === PageRoutes.home) return;

    window.location.assign(PageRoutes.home);
};

////////////////////////////////////////////////////////////

export {
    signIn,
    signOut,
    redirectToHome,
};
