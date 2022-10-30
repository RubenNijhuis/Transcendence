// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { Profile, Request } from "../../types";

// Proxies
import { getProfileByUsername } from "../profile";

////////////////////////////////////////////////////////////

/**
 * Requests all the friends of a particular profile.
 * @param username
 * @returns array of profile id's
 */
const getFriendsByUsername = async (
    username: string
): Promise<Profile.Instance[]> => {
    try {
        const route = ApiRoutes.getFriendsByUsername(username);
        const { data } = await API.get<string[]>(route);

        const profilesFromUsernames: Profile.Instance[] = [];

        for (const profileUsername of data) {
            const imageSelect: Request.Payload.ImageSelect = {
                profile: true,
                banner: false
            };

            const retrievedProfile = await getProfileByUsername(
                profileUsername,
                imageSelect
            );

            profilesFromUsernames.push(retrievedProfile);
        }

        return Promise.resolve(profilesFromUsernames);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getFriendsByUsername };
