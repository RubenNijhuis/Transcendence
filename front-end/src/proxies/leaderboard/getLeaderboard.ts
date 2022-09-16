// Request
import axios from "axios";

// Types
import { Profile, RequestError } from "../../utils/GlobalTypes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import { ApiRoutes } from "../../config";

const getLeaderboard = (
    authToken: string
): Promise<Profile[] | RequestError> => {
    return axios
        .get(ApiRoutes.getLeaderboard(), {
            headers: getAuthHeader(authToken)
        })
        .then((res) => {
            const returnedLeaderboard: Profile[] = res.data;
            return returnedLeaderboard;
        })
        .catch((err) => {
            return err;
        });
};

export default getLeaderboard;
