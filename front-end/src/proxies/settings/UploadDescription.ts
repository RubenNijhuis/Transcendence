import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

////////////////////////////////////////////////////////////

const uploadDescription = async (
    username: string,
    description: string
): Promise<any> => {
    try {
        const route = ApiRoutes.updateDescription();
        const config = {
            username,
            description,
        };

        const { data } = await API.post(route, config);
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { uploadDescription };
