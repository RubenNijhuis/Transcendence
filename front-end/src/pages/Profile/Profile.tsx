// React
import { useEffect, useRef, useState } from "react";

// Url params
import { useParams } from "react-router-dom";

// UI
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import GameHistory from "../../components/GameHistory";

// Profile components
import ProfileDisplay from "../../components/Profile/ProfileDisplay";
import ProfileActions from "../../components/Profile/ProfileActions";

// Authentication
import { useAuth } from "../../contexts/AuthContext";
// User context
import { useUser } from "../../contexts/UserContext";

// Types
import { ProfileType } from "../../types/profile";

// DEBUG
import { useFakeData } from "../../contexts/FakeDataContext";

// API
import { getProfileByUsername } from "../../proxies/user";
import { getValueFromUrl } from "../../utils/getValueFromUrl";

// Store
import { getItem, setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Modal Components
import { useModal } from "../../contexts/ModalContext";
import CreateAccount from "../../containers/CreateAccount/CreateAccount";

////////////////////////////////////////////////////////////

const ProfilePage = (): JSX.Element => {
    const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null!);

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
                setItem(StoreId.loginProcess, false);
                return;
            }

            if (shouldCreateUser) {
                setModalElement(<CreateAccount setModalOpen={setModalOpen} />);
                setModalOpen(true);
            }
        } catch (err) {
            console.error(err);
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
    };

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const controller = new AbortController();
        
        /**
         * If the user is in the login process we check if
         * they still need to make an account. If that is
         * the case we display the Create Account Modal
         */
        const inLoginProcess = getItem<boolean>(StoreId.loginProcess);

        // I shouldn't have to check if the user is null but for some reason it's needed
        if (inLoginProcess === true) {
            handleLoginProcess();
            return;
        }

        handleSetProfile();
    }, [user]);

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            {selectedProfile ? (
                <>
                    <ProfileDisplay
                        profile={selectedProfile}
                        matchHistory={matchHistory}
                    />
                    {selectedProfile !== user && (
                        <ProfileActions profile={selectedProfile} />
                    )}
                    <GameHistory
                        player={selectedProfile}
                        matches={matchHistory}
                    />
                </>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default ProfilePage;
