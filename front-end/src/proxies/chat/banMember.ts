// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Retrieves all chats from a user
 * @param username
 * @returns
 */
const banMember = async (memberId: string, groupId: string): Promise<void> => {
    try {
        const route = ApiRoutes.banMember();
        const { data } = await API.post(route, {
            memberId,
            groupId
        });

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { banMember };
