// Types
import * as Request from "../../types/Request";
import * as Profile from "../../types/Profile";

// Proxies
import { getProfileBannerByUsername } from "./getProfileBannerByUsername";
import { getProfileImageByUsername } from "./getProfileImageByUsername";

/////////////////////////////////////////////////////////////

/**
 * Takes a profile and adds the images in base64 format to the object
 * @param profile
 * @returns
 */
const addImagesToProfile = async (
    profile: Profile.Instance,
    imageSelect: Request.Payload.ImageSelect
): Promise<Profile.Instance> => {
    try {
        const username = profile.username;

        if (imageSelect.profile)
            profile.img_url = await getProfileImageByUsername(username);

        if (imageSelect.banner)
            profile.banner_url = await getProfileBannerByUsername(username);

        return Promise.resolve(profile);
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { addImagesToProfile };
