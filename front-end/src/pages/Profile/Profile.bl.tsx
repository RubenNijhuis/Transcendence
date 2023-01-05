// React
import { useEffect, useState } from "react";

// Types
import * as Request from "../../types/Request";
import * as Profile from "../../types/Profile";

// Proxies
import { getProfileByUsername } from "../../proxies/profile";
import { getFriendsByUsername } from "../../proxies/friend";

////////////////////////////////////////////////////////////

export const useProfileFriends = (
    profile: Profile.Instance
): Profile.Instance[] => {
    const [profileFriends, setProfileFriends] = useState<Profile.Instance[]>(
        []
    );

    useEffect(() => {
        if (!profile) return;
        getFriendsByUsername(profile.username).then(setProfileFriends);
    }, [profile]);

    return profileFriends;
};

export const useGetSelectedProfile = (
    user: Profile.Instance,
    username: string | undefined
): Profile.Instance => {
    const [selectedProfile, setSelectedProfile] = useState<Profile.Instance>(
        null!
    );

    useEffect(() => {
        if (!user) return;
        
        if (username === undefined || username === user.username) {
            setSelectedProfile(user);
            return;
        }

        const imageSelect: Request.Payload.ImageSelect = {
            profile: true,
            banner: true
        };

        getProfileByUsername(username, imageSelect).then(setSelectedProfile);
    }, [user, username]);

    return selectedProfile;
};
