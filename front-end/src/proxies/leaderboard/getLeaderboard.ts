// Request
import axios from "axios";
import transformToRequestError from "../utils/transformToRequestError";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Types
import { Profile } from "../../types/profile";

const getLeaderboard = async (authToken: string): Promise<Profile[]> => {
    try {
        const { data } = await axios.get<Profile[]>(
            ApiRoutes.getLeaderboard(),
            {
                headers: getAuthHeader(authToken)
            }
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getLeaderboard;
