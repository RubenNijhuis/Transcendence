// Request
import axios from "axios";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Error transformer
import transformToRequestError from "../utils/transformToRequestError";

// Types
import { GroupChat } from "../../types/chat";

const getChatByUserName = async (userName: string): Promise<GroupChat[]> => {
    try {
        const { data } = await axios.get<GroupChat[]>(
            ApiRoutes.getChatByUserName(userName),
            {
                headers: getAuthHeader()
            }
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getChatByUserName;
