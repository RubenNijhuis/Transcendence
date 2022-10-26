// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";

////////////////////////////////////////////////////////////

/**
 * Returns the first 100 on the leaderboard
 * @returns
 */
const getLeaderboard = async (): Promise<ProfileType[]> => {
    try {
        const route = ApiRoutes.getLeaderboard();

        const { data } = await API.get<ProfileType[]>(route);

        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export { getLeaderboard };
