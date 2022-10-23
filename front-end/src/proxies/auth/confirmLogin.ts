// API request setup
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";
import addImagesToProfile from "../user/addImagesToProfile";

// Types
import { LoginConfirmResponse } from "../../types/request";

const confirmLogin = async (code: string): Promise<LoginConfirmResponse> => {
    try {
        const { data } = await API.get<LoginConfirmResponse>(
            ApiRoutes.confirmLogin(code)
        );

        data.profile = await addImagesToProfile(data.profile);

        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default confirmLogin;
