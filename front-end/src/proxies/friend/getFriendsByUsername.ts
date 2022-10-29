// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";
import { getProfileByUsername } from "../profile";
import { ImageSelect } from "../../types/request";

////////////////////////////////////////////////////////////

/**
 * Requests all the friends of a particular profile.
 * @param username
 * @returns array of profile id's
 */
const getFriendsByUsername = async (
    username: string
): Promise<ProfileType[]> => {
    try {
        const route = ApiRoutes.getFriendsByUsername(username);
        const { data } = await API.get<string[]>(route);

        const profilesFromUsernames: ProfileType[] = [];

        for (const profileUsername of data) {
            const imageSelect: ImageSelect = {
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

export { getFriendsByUsername };
