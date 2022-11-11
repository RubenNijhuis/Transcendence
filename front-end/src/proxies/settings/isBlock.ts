import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

////////////////////////////////////////////////////////////

const IsBlock = async (username: string, blocked: string): Promise<any> => {
    try {
        const route = ApiRoutes.isBlock(username, blocked);
		const { data } = await API.post(route);
		return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { IsBlock };
