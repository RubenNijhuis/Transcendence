import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

/////////////////////////////////////////////////////////////

const deleteUser = async (username: string): Promise<any> => {
    try {
        const route = ApiRoutes.deleteUser();
        const config = {
			username
		};
		const { data } = await API.post(route, config);
		return Promise.resolve(data);

    }
	catch (err) {
        return Promise.reject(err);
    }
};

/////////////////////////////////////////////////////////////

export { deleteUser };
