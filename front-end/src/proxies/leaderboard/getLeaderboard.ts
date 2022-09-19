// Request
import axios from "axios";
import transformToRequestError from "../utils/transformToRequestError";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Types
import { Profile } from "../../types/GlobalTypes";

const getLeaderboard = async (authToken: string): Promise<Profile[]> => {
    try {
        const res = await axios.get<Profile[]>(ApiRoutes.getLeaderboard(), {
            headers: getAuthHeader(authToken)
        });
        const returnedLeaderboard: Profile[] = res.data;
        return Promise.resolve(returnedLeaderboard);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getLeaderboard;
