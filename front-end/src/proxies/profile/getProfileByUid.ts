// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import * as Request from "../../types/Request";
import * as Profile from "../../types/Profile";

// Proxies
import { addImagesToProfile } from "./addImagesToProfile";

////////////////////////////////////////////////////////////

/**
 * Retrieves a profile based on the uid
 * @param uid
 * @returns
 */
const getProfileByUid = async (
    uid: Profile.ID,
    imageSelect: Request.Payload.ImageSelect
): Promise<Profile.Instance> => {
    try {
        const route = ApiRoutes.getProfileByUid(uid);

        const { data } = await API.get<Profile.Instance>(route);

        const profile = addImagesToProfile(data, imageSelect);

        return Promise.resolve(profile);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getProfileByUid };
