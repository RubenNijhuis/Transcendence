// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { Chat, Profile } from "../../types";

////////////////////////////////////////////////////////////

interface SendMessagePayload {
    group_id: string;
    content: Chat.Message.MessageTypes;
    content_type: Chat.Message.ContentType;
}

/**
 * Creates a chat that will be saved in the database
 * @param owner
 * @param name
 * @param users
 * @returns confirmation response
 */
const sendMessage = async (
    messagePayload: SendMessagePayload
): Promise<number> => {
    try {
        const route = ApiRoutes.sendMessage();
        const body = messagePayload;

        const { data } = await API.post<number>(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { sendMessage };
