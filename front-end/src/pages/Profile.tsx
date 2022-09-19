// React
import { useEffect, useState } from "react";

// Optional url params
import { useParams } from "react-router-dom";

// Components
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import GameHistory from "../components/GameHistory";

// Profile components
import ProfileDisplay from "../components/Profile/ProfileDisplay";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileActions from "../components/Profile/ProfileActions";

// Authentication
import { useAuth } from "../contexts/AuthContext";

// Types
import { Profile } from "../types/GlobalTypes";

// Styling constants
import { largeRadius, mainColor } from "../styles/StylingConstants";

// Debug data
import { useDataDebug } from "../contexts/DebugDataContext";

// API
import getUserByUsername from "../proxies/user/getProfileByUsername";

// Debugging
import Logger from "../utils/Logger";

const ProfilePage = () => {
    // Profile to be displayed
    const [selectedProfile, setSelectedProfile] = useState<Profile>(null!);

    // Temp debug data
    const { matchHistory } = useDataDebug();

    // Local profile
    const { user, authToken } = useAuth();

    /**
     * The `userName` in the url '/profile/:userName' if not
     * specified will default to undefined
     */
    const { userName } = useParams();

    /**
     * If the userName is undefined set profile to local user
     * Otherwise get user from db and set them as profile
     */
    useEffect(() => {
        if (userName === undefined) setSelectedProfile(user);
        else {
            getUserByUsername(userName, authToken)
                .then((res) => {
                    setSelectedProfile(res as Profile);
                })
                .catch((err) =>
                    Logger("ERROR", "Profile", "Loading user by username", err)
                );
        }
    }, [userName, user, authToken]);

    return (
        <Layout>
            {selectedProfile && user ? (
                <div
                    style={{
                        borderRadius: largeRadius,
                        backgroundColor: mainColor
                    }}
                >
                    <ProfileDisplay user={selectedProfile} />
                    <ProfileStats
                        player={selectedProfile}
                        matches={matchHistory}
                    />
                    {selectedProfile.username !== user.username && (
                        <ProfileActions profile={selectedProfile} />
                    )}
                    <GameHistory
                        player={selectedProfile}
                        matches={matchHistory}
                    />
                </div>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default ProfilePage;
