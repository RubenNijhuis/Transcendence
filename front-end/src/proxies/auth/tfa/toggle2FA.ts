// API Request config
import ApiRoutes from "../../../config/ApiRoutes";
import { API } from "../../instances/apiInstance";

////////////////////////////////////////////////////////////

const toggle2FA = async (uid: string): Promise<string> => {
    try {
        console.log(uid);
        const route = ApiRoutes.turnOnTFA();
        const body = {
            uid,
        };

        const { data } = await API.post(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { toggle2FA };
