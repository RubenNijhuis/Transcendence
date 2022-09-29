// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { ProfileType } from "../../types/profile";

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

const createUser = async (userData: createUserProps): Promise<ProfileType> => {
    try {
        const { data } = await API.post<ProfileType>(ApiRoutes.createUser());
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default createUser;
