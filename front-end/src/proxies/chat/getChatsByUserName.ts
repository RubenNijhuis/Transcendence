// Request
import axios from "axios";

// Types
import { GroupChat } from "../../types/chat";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Error transformer
import transformToRequestError from "../utils/transformToRequestError";

const getChatByUserName = async (
    userName: string,
    authToken: string
): Promise<GroupChat[]> => {
    try {
        const res = await axios.get(ApiRoutes.getChatByUserName(userName), {
            headers: getAuthHeader(authToken)
        });
        const returnedChats: GroupChat[] = res.data;
        return returnedChats;
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getChatByUserName;
