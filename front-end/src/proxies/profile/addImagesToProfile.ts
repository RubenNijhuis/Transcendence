// Types
import { ProfileType } from "../../types/profile";
import { ImageSelect } from "../../types/request";

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
    profile: ProfileType,
    imageSelect: ImageSelect
): Promise<ProfileType> => {
    try {
        // TODO: can this be done in a switch case?
        if (imageSelect.profile)
            profile.img_url = await getProfileImageByUsername(profile.username);
        
        if (imageSelect.banner)
            profile.banner_url = await getProfileBannerByUsername(profile.username);

        return Promise.resolve(profile);
    } catch (err) {
        return Promise.reject(err);
    }
};

export { addImagesToProfile };
