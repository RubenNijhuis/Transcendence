// API Request config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

const toggle2FA = async (uid: string): Promise<string> => {
    try {
        const route = ApiRoutes.turnOnTFA();
        const config = {
            uid
        }

        const { data } = await API.post(route, config);
        return Promise.resolve(data);

    } catch (err: any) {
        return Promise.reject(err);
    }
};

export { toggle2FA };
