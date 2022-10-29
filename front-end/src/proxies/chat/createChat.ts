// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { GroupChat } from "../../types/chat";
import { ProfileType } from "../../types/profile";
import { AxiosRequestConfig } from "axios";

////////////////////////////////////////////////////////////

/**
 * Creates a chat that will be saved in the database
 * @param owner
 * @param name
 * @param users
 * @returns confirmation response
 */
const createChat = async (
    owner: ProfileType,
    name: string,
    users: ProfileType[]
): Promise<GroupChat[]> => {
    try {
        const route = ApiRoutes.createChat();
        const body = {
            owner,
            name,
            users
        };

        const { data } = await API.post<GroupChat[]>(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { createChat };
