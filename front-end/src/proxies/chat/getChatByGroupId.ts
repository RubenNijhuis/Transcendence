// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import * as Chat from "../../types/Chat";

////////////////////////////////////////////////////////////

/**
 * Retrieves all chats from a user
 * @param groupId
 * @returns
 */
const getChatByGroupId = async (
    groupId: string
): Promise<Chat.Group.Instance> => {
    try {
        const route = ApiRoutes.getChatsByGroupId(groupId);
        const { data } = await API.get<Chat.Group.Instance>(route);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getChatByGroupId };
