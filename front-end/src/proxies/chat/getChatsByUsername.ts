// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { Chat } from "../../types";

////////////////////////////////////////////////////////////

/**
 * Retrieves all chats from a user
 * @param username
 * @returns
 */
const getChatsByUsername = async (
    username: string
): Promise<Chat.Group.Instance[]> => {
    try {
        let chats: Chat.Group.Instance[] = [];

        const metaroute = ApiRoutes.getGroupsByUid(username);
        const metachats = await API.get<any[]>(metaroute);

        for (const a of metachats.data) {
            console.log(a);
            const newchat = await API.get<Chat.Group.Instance>(ApiRoutes.getChatById(a.uid));
            chats.push(newchat.data);
        }

        return Promise.resolve(chats);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getChatsByUsername };