// API request setup
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { ConfirmLoginResponse } from "../../types/request";

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

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { confirmLogin };
