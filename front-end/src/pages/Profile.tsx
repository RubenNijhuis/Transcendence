// React
import { useEffect, useState } from "react";

// Optional url params
import { useParams } from "react-router-dom";

// UI
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
import { ProfileType } from "../types/profile";
import { RequestErrorType } from "../types/request";

// Styling constants
import { largeRadius, mainColor } from "../styles/StylingConstants";

// Debug data
import { useFakeData } from "../contexts/FakeDataContext";

// API
import getUserByUsername from "../proxies/user/getProfileByUsername";

// Debugging
import { useModal } from "../contexts/ModalContext";

const ProfilePage = () => {
    // Profile to be displayed
    const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null!);

    // Modal
    const { setIsModalOpen, setError } = useModal();

    // Temp debug data
    const { matchHistory } = useFakeData();

    // Local profile
    const { user, authToken } = useAuth();

    /**
     * The `userName` in the url '/profile/:userName' if not
     * specified will default to undefined
     */
    const { userName } = useParams();

    useEffect(() => {
        if (userName === undefined) setSelectedProfile(user);
        else {
            getUserByUsername(userName, authToken)
                .then(setSelectedProfile)
                .catch((err: RequestErrorType) => {
                    setError(err);
                    setIsModalOpen(true);
                });
        }
    }, [userName, user, authToken, setError, setIsModalOpen]);

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
