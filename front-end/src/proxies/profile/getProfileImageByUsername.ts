// API Request config
import { API } from "../instances/apiInstance";
import ApiRoutes from "../../config/ApiRoutes";

// TODO: remove this bit somehow. Don't want to couple the function the the api lib
import { AxiosRequestConfig } from "axios";

// Image buffer
import { Buffer } from "buffer";

///////////////////////////////////////////////////////////

const getProfileImageByUsername = async (username: string): Promise<string> => {
    try {
        const route = ApiRoutes.getProfileImageByUsername(username);
        const config: AxiosRequestConfig = {
            responseType: "arraybuffer"
        };

        const { data } = await API.get(route, config);

        const toBase64String = `data:image/png;base64,${Buffer.from(
            data,
            "binary"
        ).toString("base64")}`;

        return Promise.resolve(toBase64String);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getProfileImageByUsername };
