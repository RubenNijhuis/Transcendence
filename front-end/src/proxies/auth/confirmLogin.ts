// Api Routes
import { ApiRoutes } from "../../config";

// Requests
import axios from "axios";

// Types
import { LoginConfirmResponse, RequestError } from "../../utils/GlobalTypes";

const confirmLogin = async (
    code: string
): Promise<LoginConfirmResponse | RequestError> => {
    try {
        const loginConfirmResp = await axios.get(ApiRoutes.confirmLogin(code));
        const returnedData: LoginConfirmResponse = loginConfirmResp.data;
        return returnedData;
    } catch (err) {
        return err as RequestError;
    }
};

export default confirmLogin;
