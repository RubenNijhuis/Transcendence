// React
import { useEffect } from "react";

// UI
import Layout from "../../components/Layout";
import GameHistory from "../../components/GameHistory";

// Profile components
import { ProfileDisplay } from "../../components/Profile";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

// DEBUG
import { useFakeData } from "../../contexts/FakeDataContext";

// API
import { useParams } from "react-router-dom";
import { getValueFromUrl } from "../../utils/string";

// Store
import { getItem, setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Modal Components
import { useModal } from "../../contexts/ModalContext";
import CreateAccount from "../../containers/CreateAccount";
import FriendList from "../../components/FriendsList";

// UI
import { ProfileDetailsContainer } from "./Profile.style";
import TwoFactorAuthentication from "../../containers/TwoFactorAuthentication";

// Business logic
import { useProfileFriends, useGetSelectedProfile } from "./Profile.bl";

////////////////////////////////////////////////////////////

const ProfilePage = (): JSX.Element => {
    const { profileName } = useParams();
    const { user, setUser } = useUser();
    const selectedProfile = useGetSelectedProfile(user, profileName);
    const profileFriends = useProfileFriends(selectedProfile);
    const { signIn } = useAuth();

    ////////////////////////////////////////////////////////

    // Temp debug data
    const { matchHistory } = useFakeData();

    // Create account modal
    const { setModalActive, setModalElement, setAllowClose } = useModal();

    ////////////////////////////////////////////////////////

    /**
     * Handle login process will attempt to retrieve the user in one of three ways
     * 1. Let the user set up their profile
     * 2. Let the user fully login using 2fa
     * 3. No 2fa is set and the account has already been created
     */
    const handleLoginProcess = async () => {
        const apiToken = getValueFromUrl(window.location.href, "code");

        try {
            const { profile, shouldCreateUser, TWOfaEnabled } = await signIn(
                apiToken
            );

            if (shouldCreateUser) {
                setModalElement(<CreateAccount />);
                setAllowClose(false);
                setModalActive(true);
                return;
            }

            /**
             * If 2fa is enabled we retrieve the user from there
             */
            if (TWOfaEnabled === true) {
                setModalElement(<TwoFactorAuthentication />);
                setAllowClose(false);
                setModalActive(true);
                return;
            }

            if (profile !== null) {
                setUser(profile);
                setItem(StoreId.loginProcess, false);
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    ///////////////////////////////////////////////////////

    useEffect(() => {
        if (user) {
            // Reset the create account modal after account creation
            setModalActive(false);
            return;
        }

        const inLoginProcess = getItem<boolean>(StoreId.loginProcess);
        if (inLoginProcess) {
            handleLoginProcess();
        }
    }, [user]);

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            {selectedProfile && (
                <>
                    <ProfileDisplay
                        profile={selectedProfile}
                        matchHistory={matchHistory}
                    />

                    <ProfileDetailsContainer>
                        <FriendList
                            friends={profileFriends}
                            withFriendRequests={user.username === selectedProfile.username}
                        />
                        <GameHistory
                            player={selectedProfile}
                            matches={matchHistory}
                        />
                    </ProfileDetailsContainer>
                </>
            )}
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default ProfilePage;
