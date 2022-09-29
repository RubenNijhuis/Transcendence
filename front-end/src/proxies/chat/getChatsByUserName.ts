// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { GroupChat } from "../../types/chat";

const getChatByUserName = async (userName: string): Promise<GroupChat[]> => {
    try {
        const { data } = await API.get<GroupChat[]>(
            ApiRoutes.getChatByUserName(userName)
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getChatByUserName;
