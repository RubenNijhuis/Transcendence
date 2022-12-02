// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { Chat, Profile } from "../../types";

////////////////////////////////////////////////////////////

/**
 * Creates a chat that will be saved in the database
 * @param owner
 * @param name
 * @param users
 * @returns confirmation response
 */
const createChat = async (
    owner: Profile.ProfileID,
    name: string,
    users: Profile.ProfileID[]
): Promise<Chat.Group.Instance[]> => {
    try {
        const route = ApiRoutes.createChat();
        const body = {
            owner,
            name,
            users,
        };

        const { data } = await API.post(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { createChat };
