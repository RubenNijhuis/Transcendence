import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

/////////////////////////////////////////////////////////////

const IsBlock = async (username: string, blockname: string): Promise<any> => {
    try {
        const route = ApiRoutes.isBlock(username, blockname);
		const { data } = await API.get(route);
		return Promise.resolve(data);

    }
	catch (err) {
        return Promise.reject(err);
    }
};

/////////////////////////////////////////////////////////////

export { IsBlock };
