// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";
import transformToRequestError from "../utils/transformToRequestError";

// Types
import { ProfileType } from "../../types/profile";
import { getItem } from "../../modules/Store";
import { AuthTokenType } from "../../types/request";
import StoreIdentifiers from "../../config/StoreIdentifiers";
import { getAuthHeader } from "../utils/authToken";

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

const createUser = async (userData: createUserProps): Promise<ProfileType> => {
    try {
        const token = getItem<AuthTokenType>(StoreIdentifiers.authToken);
        console.log("TOKEN FOR CREATE", token);
        const { data } = await API.post<ProfileType>(
            ApiRoutes.createUser(),
            userData,
            {
                headers: getAuthHeader()
            }
        );
        return Promise.resolve(data);
    } catch (err: any) {
        console.log(err);
        return Promise.reject(transformToRequestError(err));
    }
};

export default createUser;
