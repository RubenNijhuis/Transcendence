// Requests
import axios from "axios";

// Types
import { Profile, RequestError } from "../../utils/GlobalTypes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../utils/ApiRoutes";

const getUser = (
    id: string,
    authToken: string
): Promise<Profile | RequestError> => {
    return axios
        .get(ApiRoutes.getUser(id), {
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

export default getUser;
