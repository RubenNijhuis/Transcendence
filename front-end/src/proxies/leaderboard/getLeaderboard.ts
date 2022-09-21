// Request
import axios from "axios";
import transformToRequestError from "../utils/transformToRequestError";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Types
import { ProfileType } from "../../types/profile";
import { AuthTokenType } from "../../types/request";

const getLeaderboard = async (authToken: AuthTokenType): Promise<ProfileType[]> => {
    try {
        const { data } = await axios.get<ProfileType[]>(
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
