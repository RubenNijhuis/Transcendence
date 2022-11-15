// API Request config
import ApiRoutes from "../../../config/ApiRoutes";
import { API } from "../../instances/apiInstance";

////////////////////////////////////////////////////////////

const confirmTFA = async (intraID: string, tfaCode: string): Promise<any> => {
    try {
        const route = ApiRoutes.confirmTFA();
        const config = {
            intraID,
            tfaCode
        }

        const { data } = await API.post(route, config);
        return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { confirmTFA };

//curl --data "intraID=..."  -H "Authorization: Bearer {'jwtsession_token'}" http://localhost:3000/api/auth/google2fa

//curl --data "intraID=...&twoFactorAuthenticationCode=..."  http://localhost:3000/api/auth/google2fa/authenticate