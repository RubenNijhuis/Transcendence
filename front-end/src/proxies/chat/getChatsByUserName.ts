// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { GroupChat } from "../../types/chat";

////////////////////////////////////////////////////////////

/**
 * Retrieves all chats from a user
 * @param username
 * @returns
 */
const getChatsByUsername = async (username: string): Promise<GroupChat[]> => {
    try {
        const route = ApiRoutes.getChatsByUsername(username);

        const { data } = await API.get<GroupChat[]>(route);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { getChatsByUsername };
