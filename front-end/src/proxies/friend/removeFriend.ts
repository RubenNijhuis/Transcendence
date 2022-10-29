// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Removes a friend from a user
 * @returns ?
 */
const removeFriend = async (
    username: string,
    friendname: string
): Promise<any> => {
    try {
        const route = ApiRoutes.removeFriend();
        const body = {
            username,
            friendname
        };
        
        const { data } = await API.post<any>(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { removeFriend };
