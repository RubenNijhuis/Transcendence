// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Retrieves all chats from a user
 * @param username
 * @returns
 */
const isMemberBanned = async (
    memberId: string,
    groupId: string
): Promise<boolean> => {
    try {
        const route = ApiRoutes.isMemberBanned();
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

export { isMemberBanned };
