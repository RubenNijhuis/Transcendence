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
import ProfileActions from "../components/Profile/ProfileActions";

// Authentication
import { useAuth } from "../contexts/AuthContext";

// Types
import { ProfileType } from "../types/profile";

// Styling constants
import { largeRadius, mainColor } from "../styles/StylingConstants";

// DEBUG
import Logger from "../utils/Logger";
import { useFakeData } from "../contexts/FakeDataContext";

// API
import { getProfileByUsername } from "../proxies/user";
import { getValueFromUrl } from "../utils/getValueFromUrl";

// Store
import { getItem } from "../modules/Store";
import StoreId from "../config/StoreId";

// Modal Components
import { useModal } from "../contexts/ModalContext";
import CreateAccount from "../containers/CreateAccount/CreateAccount";

// User context
import { useUser } from "../contexts/UserContext";

////////////////////////////////////////////////////////////

const ProfilePage = (): JSX.Element => {
    const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null!);
    const [isUserProfile, setIsUserProfile] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    // Temp debug data
    const { matchHistory } = useFakeData();

    // Local profile
    const { signIn } = useAuth();
    const { user, setUser } = useUser();

    // Create account modal
    const { setModalOpen, setModalElement } = useModal();

    /**
     * The `username` in the url '/profile/:username' if not
     * specified will default to undefined
     */
    const { profileName } = useParams();

    ////////////////////////////////////////////////////////////

    const handleLoginProcess = async () => {
        const apiToken = getValueFromUrl(window.location.href, "code");

        try {
            const { profile, shouldCreateUser } = await signIn(apiToken);

            if (profile) {
                setUser(profile);
            }

            if (shouldCreateUser) {
                setModalElement(<CreateAccount setModalOpen={setModalOpen} />);
                setModalOpen(true);
            }
        } catch (err) {
            Logger("AUTH", "Succesful login", "Sign in issue", err);
        }
    };

    const handleSetProfile = async () => {
        /**
         * If there is a profile name in the url we
         * request that user and set it as the profile
         */
        if (profileName !== undefined) {
            try {
                const returnedProfile = await getProfileByUsername(profileName);
                setSelectedProfile(returnedProfile);
            } catch (err) {
                console.error(err);
            }
        }

        /**
         * If no profile is in the url we set
         * the user as the profile
         */
        setSelectedProfile(user);
        setIsUserProfile(true);
    };

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        /**
         * If the user is in the login process we check if
         * they still need to make an account. If that is
         * the case we display the Create Account Modal
         */
        const inLoginProcess = getItem<boolean>(StoreId.loginProcess);

        if (inLoginProcess === true) {
            handleLoginProcess();
        } else {
            handleSetProfile();
        }
    }, [user]);

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            {selectedProfile ? (
                <div
                    style={{
                        borderRadius: largeRadius,
                        backgroundColor: mainColor
                    }}
                >
                    <ProfileDisplay
                        profile={selectedProfile}
                        matchHistory={matchHistory}
                    />
                    {!isUserProfile && (
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
