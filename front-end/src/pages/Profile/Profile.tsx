// React
import { useEffect, useState } from "react";

// UI
import Layout from "../../components/Layout";
import GameHistory from "../../components/GameHistory";

// Profile components
import { ProfileDisplay } from "../../components/Profile";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { useSocket } from "../../contexts/SocketContext";

// API
import { useNavigate, useParams } from "react-router-dom";
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

import * as Match from '../../types/Match'
import { getMatchesByUsername } from "../../proxies/profile/getMatchesByUsername";

////////////////////////////////////////////////////////////

const ProfilePage = (): JSX.Element => {
    const [matches, setMatches] = useState<Match.Record[]>([]);
    // Find the user to be displayed
    const { profileName } = useParams();

    // The user context
    const { user, setUser, setFriends } = useUser();

    // Profile to be displayed
    const selectedProfile = useGetSelectedProfile(user, profileName);
    const profileFriends = useProfileFriends(selectedProfile);

    // Auth
    const { signIn } = useAuth();

    // Create account modal
    const { openModal, setModalElement, setAllowClose } = useModal();

    ////////////////////////////////////////////////////////

    /**
     * Handle login process will attempt to retrieve the user in one of three ways
     * 1. Let the user set up their profile
     * 2. Let the user fully login using 2fa
     * 3. No 2fa is set and the account has already been created
     */
    const handleLoginProcess = async () => {
        const apiToken = getValueFromUrl(window.location.href, "code");

        if (!apiToken) return;
        try {
            const { profile, shouldCreateUser, TWOfaEnabled } = await signIn(
                apiToken
            );

            console.log(profile, shouldCreateUser, TWOfaEnabled);

            if (shouldCreateUser) {
                setModalElement(<CreateAccount />);
                setAllowClose(false);
                openModal(true);
                return;
            } else if (TWOfaEnabled) {
                setModalElement(<TwoFactorAuthentication user={profile} showToggle={false}/>);
                setAllowClose(false);
                openModal(true);
                return;
            } else if (profile) {
                setUser(profile);
                setItem(StoreId.loginProcess, false);
                return;
            } else {
                console.error("No authentication method was chosen", {
                    profile,
                    shouldCreateUser,
                    TWOfaEnabled
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    ///////////////////////////////////////////////////////

    useEffect(() => {
        if (user && selectedProfile) {
            // Reset the create account modal after account creation
            openModal(false);
            setAllowClose(true);
            setFriends(profileFriends);

            getMatchesByUsername(selectedProfile.username).then(setMatches);
            return;
        }

        const inLoginProcess = getItem<boolean>(StoreId.loginProcess);
        if (inLoginProcess) {
            handleLoginProcess();
        }
    }, [user, selectedProfile]);

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            {selectedProfile && (
                <>
                    <ProfileDisplay
                        profile={selectedProfile}
                        matchHistory={matches}
                    />

                    <ProfileDetailsContainer>
                        <FriendList
                            friends={profileFriends}
                            withFriendRequests={
                                user.username === selectedProfile.username
                            }
                        />
                        <GameHistory
                            player={selectedProfile}
                            matches={matches}
                        />
                    </ProfileDetailsContainer>
                </>
            )}
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default ProfilePage;
