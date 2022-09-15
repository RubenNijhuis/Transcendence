// Request
import axios from "axios";

// Types
import { GroupChat, RequestError } from "../../utils/GlobalTypes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../utils/ApiRoutes";

const getChats = (
    id: string,
    authToken: string
): Promise<GroupChat[] | RequestError> => {
    return axios
        .get(ApiRoutes.getChats(id), {
            headers: getAuthHeader(authToken)
        })
        .then((res) => {
            const returnedChats: GroupChat[] = res.data;
            return returnedChats;
        })
        .catch((err) => {
            return err;
        });
};

export default getChats;
