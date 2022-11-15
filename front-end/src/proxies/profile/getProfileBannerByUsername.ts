// API
import { API, apiRequestConfig} from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// Image transform
import { Buffer } from "buffer";

/////////////////////////////////////////////////////////////

/**
 * Retrieves the profile banner by username
 * @param username
 * @returns
 */
const getProfileBannerByUsername = async (
    username: string
): Promise<string> => {
    try {
        const route = ApiRoutes.getProfileBannerByUsername(username);
        const config: apiRequestConfig= {
            responseType: "arraybuffer"
        };

        const { data } = await API.get(route, config);

        // Image transform
        const buffer = Buffer.from(data, "binary").toString("base64");
        const toBase64String = `data:image/png;base64,${buffer}`;

        return Promise.resolve(toBase64String);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getProfileBannerByUsername };
