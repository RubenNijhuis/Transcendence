// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import * as Request from "../../types/Request";
import * as Profile from "../../types/Profile";

// Proxies
import { addImagesToProfile } from "../profile";

////////////////////////////////////////////////////////////

/**
 * Requests all the friends of a particular profile.
 * @param username
 * @returns array of profile id's
 */
const getRequested = async (): Promise<Profile.Instance[]> => {
    try {
        const route = ApiRoutes.getRequested();
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

export { getRequested };
