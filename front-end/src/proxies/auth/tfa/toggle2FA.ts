// API Request config
import ApiRoutes from "../../../config/ApiRoutes";
import { API } from "../../instances/apiInstance";

////////////////////////////////////////////////////////////

const toggle2FA = async (id: string): Promise<string> => {
    try {
        const route = ApiRoutes.turnOnTFA();
        const body = {
            id
        };

        const { data } = await API.post(route, body);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { toggle2FA };
