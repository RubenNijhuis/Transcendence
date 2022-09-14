// Request
import axios from "axios";

// Types
import { Profile } from "../../utils/GlobalTypes";

// Auth
import { getAuthHeader } from "../utils/authToken";

// Api Routes
import ApiRoutes from "../utils/routes";

interface createUserProps {
    username: string;
    color: string;
    description: string;
}

const createUser = (
    userData: createUserProps,
    authToken: string
): Promise<any> => {
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
