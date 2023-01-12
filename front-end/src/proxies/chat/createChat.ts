// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import * as Chat from "../../types/Chat";
import * as Profile from "../../types/Profile";

////////////////////////////////////////////////////////////

/**
 * Creates a chat that will be saved in the database
 * @param owner
 * @param name
 * @param users
 * @returns confirmation response
 */
const createChat = async (
    owner: Profile.ID,
    name: string,
    members: Profile.ID[],
    password: string
): Promise<Chat.Group.Instance> => {
    try {
        const route = ApiRoutes.createChat();
        let body: any = {
            owner,
            name,
            members
        };

        if (password && password.length > 1) {
            body.password = password;
        }

        const { data } = await API.post(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { createChat };
