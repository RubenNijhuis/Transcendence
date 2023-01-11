// API Request config
import ApiRoutes from "../../config/ApiRoutes";

///////////////////////////////////////////////////////////

const getProfileImageByUsername = async (username: string): Promise<string> => {
    try {
        const route = ApiRoutes.getProfileImageByUsername(username);
        
        return Promise.resolve(route);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getProfileImageByUsername };
