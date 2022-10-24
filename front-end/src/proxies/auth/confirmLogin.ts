// API request setup
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import { LoginConfirmResponse } from "../../types/request";

const confirmLogin = async (code: string): Promise<LoginConfirmResponse> => {
    try {
        const route = ApiRoutes.confirmLogin(code);
        const { data } = await API.get<LoginConfirmResponse>(route);

        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default confirmLogin;
