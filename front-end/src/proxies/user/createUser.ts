// Request
import axios from "axios";

// Types
import { Profile, RequestError } from "../../utils/GlobalTypes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../utils/ApiRoutes";

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

const createUser = (
    userData: createUserProps,
    authToken: string
): Promise<Profile | RequestError> => {
    return axios
        .post(ApiRoutes.createUser(), userData, {
            headers: getAuthHeader(authToken)
        })
        .then((res) => {
            const returnedProfile: Profile = res.data;
            return returnedProfile;
        })
        .catch((err) => {
            return err;
        });
};

export default createUser;
