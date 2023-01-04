// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import * as Profile from "../../types/Profile";

////////////////////////////////////////////////////////////

/**
 * Requests all the friends of a particular profile.
 * @param username
 * @returns array of profile id's
 */
const acceptFriendRequest = async (
    friendname: string
): Promise<Profile.Instance[]> => {
    try {
        const route = ApiRoutes.acceptFriendRequest(friendname);
        const { data } = await API.post(route);


        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { acceptFriendRequest };
