// Request
import axios from "axios";
import transformToRequestError from "../utils/transformToRequestError";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Types
import { ProfileType } from "../../types/profile";

const getLeaderboard = async (): Promise<ProfileType[]> => {
    try {
        const { data } = await axios.get<ProfileType[]>(
            ApiRoutes.getLeaderboard(),
            {
                headers: getAuthHeader()
            }
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getLeaderboard;
