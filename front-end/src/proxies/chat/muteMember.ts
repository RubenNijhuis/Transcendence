// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Retrieves all chats from a user
 * @param username
 * @returns
 */
const muteMember = async (memberId: string, groupId: string, time: number): Promise<void> => {
    try {
        const route = ApiRoutes.muteMember();
        const { data } = await API.post(route, {
            memberId,
            groupId,
            time
        });

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { muteMember };
