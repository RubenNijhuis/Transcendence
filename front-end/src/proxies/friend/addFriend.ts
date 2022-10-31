// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Adds a friend to the user
 * @returns
 */
const addFriend = async (
    username: string,
    friendname: string
): Promise<any> => {
    try {
        const route = ApiRoutes.addFriend();
        const body = {
            username,
            friendname
        };

        const { data } = await API.post(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { addFriend };
