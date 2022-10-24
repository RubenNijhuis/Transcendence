// Types
import { ProfileType } from "../../types/profile";

// Proxies
import getProfileBannerByUserName from "./getProfileBannerByUsername";
import getProfileImageByUserName from "./getProfileImageByUsername";

/////////////////////////////////////////////////////////////

const addImagesToProfile = async (
    profile: ProfileType
): Promise<ProfileType> => {
    try {
        profile.banner_url = await getProfileBannerByUserName(profile.username);
        profile.img_url = await getProfileImageByUserName(profile.username);

        return Promise.resolve(profile);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default addImagesToProfile;
