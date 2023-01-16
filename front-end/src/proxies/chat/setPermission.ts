// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

import * as Chat from "../../types/Chat";

////////////////////////////////////////////////////////////

/**
 * Retrieves all chats from a user
 * @param username
 * @returns
 */
const setPermission = async (
    memberId: string,
    groupId: string,
    GroupPermissionLevel: Chat.Group.Permission
): Promise<void> => {
    try {
        const route = ApiRoutes.setPermission();
        const { data } = await API.post(route, {
            targetUser: memberId,
            groupId,
            level: GroupPermissionLevel
        });

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { setPermission };
