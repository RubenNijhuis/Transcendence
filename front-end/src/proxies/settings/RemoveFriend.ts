import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

////////////////////////////////////////////////////////////

const RemoveFriend = async (username: string, friendname: string): Promise<any> => {
    try {
        const route = ApiRoutes.removeFriend();
        const config = {
			username,
			friendname
		}
		const { data } = await API.post(route, config);
		return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { RemoveFriend };
