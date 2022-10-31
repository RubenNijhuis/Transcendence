// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Checks if a friend is friends with another friend
 * @returns boolean
 */
const getIsFriend = async (
    username: string,
    friendname: string
): Promise<boolean> => {
    try {
        const route = ApiRoutes.getIsFriend();
        const body = {
            username,
            friendname
        };

        const { data } = await API.post<boolean>(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { getIsFriend };
