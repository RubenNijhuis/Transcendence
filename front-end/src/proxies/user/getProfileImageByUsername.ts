// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";
import { Buffer } from "buffer";
const getProfileImageByUsername = async (username: string): Promise<string> => {
    try {
        const { data } = await API.get(
            ApiRoutes.getProfileImageByUsername(username),
            {
                responseType: "arraybuffer"
            }
        );
        const toBase64String = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`
        return Promise.resolve(toBase64String);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default getProfileImageByUsername;
