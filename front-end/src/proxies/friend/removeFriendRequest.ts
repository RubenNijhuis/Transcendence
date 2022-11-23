// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Adds a friend to the user
 * @returns
 */
const removeFriendRequest = async (
    username: string,
    friendname: string
): Promise<any> => {
    try {
        const route = ApiRoutes.removeFriendRequest();
        const body = {
            username,
            requested: friendname,
        };

        const { data } = await API.post(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { removeFriendRequest };
