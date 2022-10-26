// API Request config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

////////////////////////////////////////////////////////////

/**
 * Retrieves the url for the third-party login route
 * @returns string
 */
const getLoginURL = async (): Promise<string> => {
    try {
        const route = ApiRoutes.getLoginRoute();

        const { data } = await API.get<string>(route);

        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export { getLoginURL };
