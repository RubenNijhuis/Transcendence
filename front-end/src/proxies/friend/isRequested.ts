// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

////////////////////////////////////////////////////////////

/**
 * Checks if a friend is friends with another friend
 * @returns boolean
 */
const isRequested = async (
    username: string,
    friendname: string
): Promise<boolean> => {
    try {
        const route = ApiRoutes.isRequested(username, friendname);

        const { data } = await API.get<boolean>(route);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { isRequested };
