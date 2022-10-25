// Types
import { ProfileType } from "../../types/profile";

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
    profile: ProfileType
): Promise<ProfileType> => {
    try {
        profile.banner_url = await getProfileBannerByUsername(profile.username);
        profile.img_url = await getProfileImageByUsername(profile.username);

        return Promise.resolve(profile);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export { addImagesToProfile };
