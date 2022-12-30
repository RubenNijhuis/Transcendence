// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import * as Profile from "../../types/Profile";
import { addImagesToProfile } from "../profile";

////////////////////////////////////////////////////////////

/**
 * Returns the first 100 on the leaderboard
 * @returns
 */
const getLeaderboard = async (): Promise<Profile.Instance[]> => {
    try {
        const route = ApiRoutes.getLeaderboard();

        const { data } = await API.get<Profile.Instance[]>(route);

        for (let profile of data) {
            profile = await addImagesToProfile(profile, {
                profile: true,
                banner: false
            });
        }

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getLeaderboard };
