// API Request config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

const startLogin = async (): Promise<string> => {
    try {
        const { data } = await API.get<string>(ApiRoutes.getLoginRoute());
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default startLogin;
