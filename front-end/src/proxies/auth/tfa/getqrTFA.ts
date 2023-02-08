// API Request config
import ApiRoutes from "../../../config/ApiRoutes";
import { API } from "../../instances/apiInstance";

////////////////////////////////////////////////////////////

const getqrTFA = async (): Promise<string> => {
    try {
        const route = ApiRoutes.getqrTFA();

        const { data } = await API.get(route);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { getqrTFA };

//curl --data "intraID=..."  -H "Authorization: Bearer {'jwtsession_token'}" http://localhost:3000/api/auth/google2fa

//curl --data "intraID=...&twoFactorAuthenticationCode=..."  http://localhost:3000/api/auth/google2fa/authenticate
