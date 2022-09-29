// Api config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";

const getLeaderboard = async (): Promise<ProfileType[]> => {
    try {
        const { data } = await API.get<ProfileType[]>(
            ApiRoutes.getLeaderboard()
        );
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getLeaderboard;
