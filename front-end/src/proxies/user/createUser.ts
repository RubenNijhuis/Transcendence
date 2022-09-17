// Request
import axios from "axios";

// Types
import { Profile, RequestError } from "../../utils/GlobalTypes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../../config/ApiRoutes";
import transformToRequestError from "../utils/transformToRequestError";

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

const createUser = async (
    userData: createUserProps,
    authToken: string
): Promise<Profile> => {
    try {
        const res = await axios
            .post(ApiRoutes.createUser(), userData, {
                headers: getAuthHeader(authToken)
            });
        const returnedProfile: Profile = res.data;
        return returnedProfile;
    } catch (err: any) {
        return Promise.reject(transformToRequestError(err));
    }
};

export default createUser;
