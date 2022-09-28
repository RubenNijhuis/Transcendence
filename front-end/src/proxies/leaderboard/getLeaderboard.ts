// Request
import axios from "axios";
import transformToRequestError from "../utils/transformToRequestError";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";

const getLeaderboard = async (): Promise<ProfileType[]> => {
    try {
        const { data } = await axios.get<ProfileType[]>(
            ApiRoutes.getLeaderboard()
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default getLeaderboard;
