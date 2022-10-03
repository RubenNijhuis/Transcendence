// Api config
import { API } from "../instances/apiInstance";

const uploadImage = async (
    url: string,
    image: FormData
): Promise<any> => {
    try {
        const { data } = await API.post(url, image);
        return Promise.resolve(data);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default uploadImage;
