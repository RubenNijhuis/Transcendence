// API request setup
import ApiRoutes from "../../../config/ApiRoutes";
import { API } from "../../instances/apiInstance";

// Types
import { Request } from "../../../types";
import { addImagesToProfile } from "../../profile";
import { updateAuthTokens } from "../../utils";

////////////////////////////////////////////////////////////

/**
 * Sends the third party login confirm code to the back-end
 * @param code
 * @returns
 */
const confirmLogin = async (
    code: string
): Promise<Request.Response.ConfirmLogin> => {
    try {
        const route = ApiRoutes.confirmLogin(code);
        const { data } = await API.get<Request.Response.ConfirmLogin>(route);

        updateAuthTokens(data.authToken);

        if (data.profile) {
            data.profile = await addImagesToProfile(data.profile, {
                profile: true,
                banner: true
            });
        }

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { confirmLogin };
