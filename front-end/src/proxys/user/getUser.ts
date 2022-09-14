// Requests
import axios from "axios";

// Types
import { Profile } from "../../utils/GlobalTypes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../utils/routes";

const getUser = (id: string, authToken: string) => {
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
