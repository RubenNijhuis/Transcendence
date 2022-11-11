import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

////////////////////////////////////////////////////////////

const UnBlock = async (username: string, blocked: string): Promise<any> => {
    try {
        const route = ApiRoutes.unBlock();
        const config = {
			username,
			blocked
		}
		const { data } = await API.post(route, config);
		return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { UnBlock };
