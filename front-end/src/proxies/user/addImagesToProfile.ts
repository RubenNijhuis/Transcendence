// API Request config
import { ProfileType } from "../../types/profile";

// Proxies
import getProfileBannerByUserName from "./getProfileBannerByUsername";
import getProfileImageByUserName from "./getProfileImageByUsername";

const addImagesToProfile = async (
    profile: ProfileType
): Promise<ProfileType> => {
    try {
        const banner_url = await getProfileBannerByUserName(profile.username);
        const img_url = await getProfileImageByUserName(profile.username);

        profile.banner_url = banner_url;
        profile.img_url = img_url;

        return Promise.resolve(profile);
    } catch (err: any) {
        return Promise.reject(err);
    }
};

export default addImagesToProfile;
