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
import { useAuth } from "../utils/AuthContext";

// Types
import { Profile } from "../utils/GlobalTypes";

// Styling constants
import { largeRadius, mainColor } from "../utils/StylingConstants";

// Debug data
import { useDataDebug } from "../utils/DebugDataContext";

const ProfilePage = () => {
    // Profile to be displayed
    const [userData, setUserData] = useState<Profile>(null!);

    // Temp debug profiles
    const { profiles, matchHistory } = useDataDebug();

    // Local profile
    const { user } = useAuth();

    /**
     * The id in the url '/profile/:id` if not
     * specified will default to undefined
     */
    const { id } = useParams();

    // TODO: unused userdata request -> use getUser proxy
    const getUserData = (id: number) => {
        const reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(profiles[id - 1]);
            }, 1000);
        });
        return reqPromise;
    };

    // TODO: get user data on page load use getUser if id is not set proxy
    useEffect(() => {
        if (id !== undefined) {
            getUserData(parseInt(id)).then((res) => {
                setUserData(res as Profile);
            });
        } else {
            if (user) setUserData(user);
        }
    });

    return (
        <Layout>
            {userData && user ? (
                <div
                    style={{
                        borderRadius: largeRadius,
                        backgroundColor: mainColor
                    }}
                >
                    <ProfileDisplay user={userData} />
                    {/* <ProfileStats player={userData} matches={matchHistory} /> */}
                    {userData.username !== user.username && (
                        <ProfileActions profile={userData} />
                    )}
                    <GameHistory player={userData} matches={matchHistory} />
                </div>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default ProfilePage;
