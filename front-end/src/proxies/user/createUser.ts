// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";
import transformToRequestError from "../utils/transformToRequestError";

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
        console.log(err);
        return Promise.reject(transformToRequestError(err));
    }
};

export default createUser;
