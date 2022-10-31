// Api config
import { API } from "../instances/apiInstance";

////////////////////////////////////////////////////////////

// TODO: remove any
/**
 * Uploads an image to a specified url
 * @param url
 * @param image
 * @returns
 */
const uploadImage = async (url: string, image: FormData): Promise<any> => {
    try {
        const { data } = await API.post(url, image);
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { uploadImage };
