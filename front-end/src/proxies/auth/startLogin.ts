// Api Routes
import { ApiRoutes } from "../../config";

// Requests
import axios from "axios";

// Types
import { RequestError } from "../../utils/GlobalTypes";

const startLogin = async (): Promise<string | RequestError> => {
    try {
        const res = await axios
            .get(ApiRoutes.loginRoute());
        const returnedUrl: string = res.data;
        return returnedUrl;
    } catch (err) {
        return err as RequestError;
    }
};

export default startLogin;
