import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

////////////////////////////////////////////////////////////

const uploadColor = async (username: string, color: string): Promise<any> => {
    try {
        const route = ApiRoutes.updateColor();
        const config = {
			username,
			color
		}
		const { data } = await API.post(route, config);
		return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { uploadColor };
