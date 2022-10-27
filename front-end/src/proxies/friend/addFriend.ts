// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";

////////////////////////////////////////////////////////////

/**
 *
 * @returns
 */
const addFriend = async (): Promise<ProfileType[]> => {
    try {
        const route = ApiRoutes.addFriend();
        const { data } = await API.get<ProfileType[]>(route);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { addFriend };
