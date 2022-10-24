// API
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";
import { AxiosRequestConfig } from "axios";

// Image transform
import { Buffer } from "buffer";

/////////////////////////////////////////////////////////////

const getProfileBannerByUserName = async (
    username: string
): Promise<string> => {
    try {
        // Request
        const route = ApiRoutes.getProfileBannerByUsername(username);
        const config: AxiosRequestConfig = {
            responseType: "arraybuffer"
        };
        const { data } = await API.get(route, config);

        // Image transform
        const buffer = Buffer.from(data, "binary").toString("base64");
        const toBase64String = `data:image/png;base64,${buffer}`;

        return Promise.resolve(toBase64String);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getProfileBannerByUserName;
