// React
import { useEffect, useState } from "react";

// Url params
import { useParams } from "react-router-dom";

// UI
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import GameHistory from "../../components/GameHistory";

// Profile components
import ProfileDisplay from "../../components/Profile/ProfileDisplay";

// Authentication
import { useAuth } from "../../contexts/AuthContext";
// User context
import { useUser } from "../../contexts/UserContext";

// Types
import { Profile, Request } from "../../types";

// DEBUG
import { useFakeData } from "../../contexts/FakeDataContext";

// API
import { getProfileByUsername } from "../../proxies/profile";
import { getFriendsByUsername } from "../../proxies/friend/getFriendsByUsername";
import { getValueFromUrl } from "../../utils/string";

// Store
import { getItem, setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Modal Components
import { useModal } from "../../contexts/ModalContext";
import CreateAccount from "../../containers/CreateAccount/CreateAccount";
import FriendList from "../../components/FriendsList";

// UI
import { ProfileDetailsContainer } from "./Profile.style";
import Logger from "../../modules/Logger";
import PageRoutes from "../../config/PageRoutes";

////////////////////////////////////////////////////////////

const ProfilePage = (): JSX.Element => {
    const [selectedProfile, setSelectedProfile] = useState<Profile.Instance>(
        null!
    );
    const [profileFriends, setProfileFriends] = useState<Profile.Instance[]>(
        null!
    );

    ////////////////////////////////////////////////////////////

    // Temp debug data
    const { matchHistory } = useFakeData();

    // Local profile
    const { signIn } = useAuth();
    const { user, setUser } = useUser();

    // Create account modal
    const { setModalActive, setModalElement } = useModal();

    /**
     * The `username` in the url '/profile/:username' if not
     * specified will default to undefined
     */
    const { profileName } = useParams();

    ////////////////////////////////////////////////////////////

    const handleLoginProcess = async () => {
        const apiToken = getValueFromUrl(window.location.href, "code");

        try {
            // TODO: setup should get 2fa
            /**
             * Option 1 - open 2fa modal
             * Option 2 - reroute to other page and after that reroute to here and reGET user
             */
            const { profile, shouldCreateUser } = await signIn(apiToken);

            // Make util func
            window.history.pushState(
                {},
                "http://localhost:8080", // TODO: get this from config
                PageRoutes.profile
            );

            if (profile) {
                setUser(profile);
                setItem(StoreId.loginProcess, false);

                return;
            }

            if (shouldCreateUser) {
                setModalElement(<CreateAccount />);
                setModalActive(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSetProfile = async () => {
        // Bit of a forced reset but it is pretty harmless
        setModalActive(false);

        /**
         * If there is a profile name in the url we
         * request that user and set it as the profile
         */
        if (profileName !== undefined) {
            try {
                const imageSelect: Request.Payload.ImageSelect = {
                    profile: true,
                    banner: true
                };

                const returnedProfile = await getProfileByUsername(
                    profileName,
                    imageSelect
                );

                setSelectedProfile(returnedProfile);

                // Reset window to top to make it feel like we went to a new page
                window.scrollTo(0, 0);

                return;
            } catch (err) {
                console.error(err);
            }
        } else {
            setSelectedProfile(user);
        }

        // Reset window to top to make it feel like we went to a new page
        // TODO: add this + url cleaner to cleanup function
        window.scrollTo(0, 0);
    };

    ////////////////////////////////////////////////////////////

    /**
     * Setting profile/user effect
     */
    useEffect(() => {
        const inLoginProcess = getItem<boolean>(StoreId.loginProcess);

        /**
         * What I think is happening is that the localStore is too slow
         * But the user state is very fast, so we don't only check for the store
         * but also see if the user is still null
         */

        if (user === null && inLoginProcess) {
            handleLoginProcess();
            return;
        }

        handleSetProfile();
    }, [user, profileName]);

    /**
     * Retrieving friends effect
     */
    useEffect(() => {
        if (!selectedProfile) return;

        const getProfileFriends = async () => {
            try {
                const retrievedFriends = await getFriendsByUsername(
                    selectedProfile.username
                );
                setProfileFriends(retrievedFriends);
            } catch (err) {
                console.error(err);
            }
        };
        getProfileFriends();
    }, [selectedProfile]);

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            {selectedProfile ? (
                <>
                    <ProfileDisplay
                        profile={selectedProfile}
                        matchHistory={matchHistory}
                    />
                    <ProfileDetailsContainer>
                        {profileFriends && (
                            <FriendList friends={profileFriends} />
                        )}
                        {matchHistory && (
                            <GameHistory
                                player={selectedProfile}
                                matches={matchHistory}
                            />
                        )}
                    </ProfileDetailsContainer>
                </>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default ProfilePage;
