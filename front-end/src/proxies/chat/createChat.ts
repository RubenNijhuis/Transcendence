// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { GroupChat } from "../../types/chat";
import { ProfileType } from "../../types/profile";

const createChat = async (
    owner: ProfileType,
    name: string,
    users: ProfileType[]
): Promise<GroupChat[]> => {
    try {
        const { data } = await API.post<GroupChat[]>(ApiRoutes.createChat(), {
            data: {
                owner,
                name,
                users
            }
        });
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default createChat;
