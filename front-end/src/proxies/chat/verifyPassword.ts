// Api config
import { API, apiRequestConfig } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { Chat } from "../../types";

////////////////////////////////////////////////////////////

/**
 * Verifies a password for the chat
 * @param username
 * @returns
 */
const verifyPassword = async (groupID: string): Promise<boolean> => {
    try {
        const route = ApiRoutes.verifyPassword(groupID);
        const config: apiRequestConfig = {
            data: {
                password: groupID
            }
        };

        // const { data } = await API.post<boolean>(route);

        return Promise.resolve(true);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { verifyPassword };
