// Api Routes
import ApiRoutes from "../utils/ApiRoutes";

// Requests
import axios from "axios";

// Types
import { LoginConfirmResponse, RequestError } from "../../utils/GlobalTypes";

const loginConfirm = (
    code: string
): Promise<LoginConfirmResponse | RequestError> => {
    return axios
        .get(ApiRoutes.loginConfirm(code))
        .then((loginConfirmResp) => {
            const returnedData: LoginConfirmResponse = loginConfirmResp.data;
            return returnedData;
        })
        .catch((err) => {
            return err;
        });
};

export default loginConfirm;
