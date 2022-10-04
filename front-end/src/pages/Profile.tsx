// React
import { useEffect, useState } from "react";

// Optional url params
import { useParams } from "react-router-dom";

// UI
import Layout from "../components/Layout";
import Loader from "../components/Loader";
// import GameHistory from "../components/GameHistory";

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
import getProfileByUserName from "../proxies/user/getProfileByUsername";

// Debugging
import { useModal } from "../contexts/ModalContext";
import getUserByAccessToken from "../proxies/user/getUserByAccessToken";

const ProfilePage = () => {
    // Profile to be displayed
    const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null!);
    const [isUserProfile, setIsUserProfile] = useState<boolean>(false);

    // Modal
    const { setIsModalOpen, setModalError } = useModal();

    // Temp debug data
    const { matchHistory } = useFakeData();

    // Local profile
    const { user, setUser } = useAuth();

    /**
     * The `userName` in the url '/profile/:userName' if not
     * specified will default to undefined
     */
    const { profileName } = useParams();

    useEffect(() => {
        /**
         * If there is no profile name in the url we set the
         * user as the current profile. Meaning we are on
         * the user's own profile page
         */
        if (profileName === undefined) {

            // if (user === null) {
            //     getUserByAccessToken()
            // }
                
            setSelectedProfile(user);
            setIsUserProfile(true);
            return;
        }

        getProfileByUserName(profileName)
            .then(setSelectedProfile)
            .catch((err: RequestErrorType) => {
                setModalError(err);
                setIsModalOpen(true);
            });
    }, [profileName, user, setModalError, setIsModalOpen]);

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
                    {!isUserProfile && (
                        <ProfileActions profile={selectedProfile} />
                    )}
                    {/* <GameHistory
                        player={selectedProfile}
                        matches={matchHistory}
                    /> */}
                </div>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default ProfilePage;
