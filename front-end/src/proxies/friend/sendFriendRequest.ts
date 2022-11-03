// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Adds a friend to the user
 * @returns
 */
const sendFriendRequest = async (
    username: string,
    friendname: string
): Promise<any> => {
    try {
        const route = ApiRoutes.sendFriendRequest();
        const body = {
            username,
            requested: friendname
        };

        const { data } = await API.post(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { sendFriendRequest };
