// API request setup
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ConfirmLoginResponse } from "../../types/request";
import { addImagesToProfile } from "../user";

////////////////////////////////////////////////////////////

/**
 * Sends the third party login confirm code to the back-end
 * @param code
 * @returns
 */
const confirmLogin = async (code: string): Promise<ConfirmLoginResponse> => {
    try {
        const route = ApiRoutes.confirmLogin(code);
        const { data } = await API.get<ConfirmLoginResponse>(route);

        if (data.profile) {
            console.log("STILL MADE IT HERE")
            data.profile = await addImagesToProfile(data.profile);
        }

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { confirmLogin };
