// Request
import axios from "axios";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Error transformer
import transformToRequestError from "../utils/transformToRequestError";

// Types
import { AuthTokenType } from "../../types/request";
import { GroupChat } from "../../types/chat";

const getChatByUserName = async (
    userName: string,
    authToken: AuthTokenType
): Promise<GroupChat[]> => {
    try {
        const { data } = await axios.get<GroupChat[]>(
            ApiRoutes.getChatByUserName(userName),
            {
                headers: getAuthHeader(authToken)
            }
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getChatByUserName;
