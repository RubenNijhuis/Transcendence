// Api config
import { API, apiRequestConfig } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Verifies a password for the chat
 * @param groupID
 * @param password
 * @returns boolean
 */
const verifyPassword = async (
    groupId: string,
    password: string
): Promise<boolean> => {
    try {
        const route = ApiRoutes.verifyPassword();
        const config = {
            groupId,
            password
        };

        const { data } = await API.post<boolean>(route, config);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { verifyPassword };
