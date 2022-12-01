import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

////////////////////////////////////////////////////////////

const RemoveAllFriends = async (username: string): Promise<any> => {
    try {
        const route = ApiRoutes.removeAllFriends();
        const config = {
			username
		};
		const { data } = await API.post(route, config);
		return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { RemoveAllFriends };
