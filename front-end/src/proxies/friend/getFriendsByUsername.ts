// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { Profile, Request } from "../../types";

// Proxies
import { addImagesToProfile, getProfileByUsername } from "../profile";

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
        const { data } = await API.get<Profile.Instance[]>(route);

        const profilesWithImages: Profile.Instance[] = [];

        for (const profile of data) {
            const imageSelect: Request.Payload.ImageSelect = {
                profile: true,
                banner: false,
            };

            const profilesWithImage = await addImagesToProfile(
                profile,
                imageSelect
            );

            profilesWithImages.push(profilesWithImage);
        }

        return Promise.resolve(profilesWithImages);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getFriendsByUsername };
