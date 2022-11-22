// API Request config
import ApiRoutes from "../../../config/ApiRoutes";
import { API } from "../../instances/apiInstance";

////////////////////////////////////////////////////////////

const getqrTFA = async (intraID: string): Promise<string> => {
    try {
        const route = ApiRoutes.getqrTFA();
        const body = {
            intraID,
        };

        const { data } = await API.post(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { getqrTFA };

//curl --data "intraID=..."  -H "Authorization: Bearer {'jwtsession_token'}" http://localhost:3000/api/auth/google2fa

//curl --data "intraID=...&twoFactorAuthenticationCode=..."  http://localhost:3000/api/auth/google2fa/authenticate
