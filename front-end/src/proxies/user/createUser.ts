// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

import addImagesToProfile from "./addImagesToProfile";

// Types
import { ProfileType } from "../../types/profile";

/////////////////////////////////////////////////////////////

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

const createUser = async (userData: createUserProps): Promise<ProfileType> => {
    try {
        const route = ApiRoutes.createUser();
        const { data } = await API.post<ProfileType>(route, userData);

        const returnedUserProfile = await addImagesToProfile(data);

        return Promise.resolve(returnedUserProfile);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default createUser;
