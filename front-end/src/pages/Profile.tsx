import { Fragment, useEffect, useState } from "react";

// Optional url params
import { useParams } from "react-router-dom";

// Components
import Layout from "../components/Layout";
import Loader from "../components/Loader";

// Profile components
import ProfileDisplay from "../components/Profile/ProfileDisplay";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileActions from "../components/Profile/ProfileActions";

// Authentication
import { useAuth } from "../utils/AuthContext";

// Types
import { Profile } from "../utils/GlobalTypes";

// Debug
import Logger from "../utils/Logger";

// Random data
import {
    generateGameResult,
    generateProfile
} from "../utils/randomDataGenerator";
import {
    largeRadius,
    mainColor,
    mediumRadius
} from "../utils/StylingConstants";
import GameHistory from "../components/GameHistory";
import { useDataDebug } from "../utils/DebugDataContext";

const ProfilePage = () => {
    const [userData, setUserData] = useState<Profile | null>(null);
    const { profiles, matchHistory } = useDataDebug();
    const { user } = useAuth();
    const { id } = useParams();

    const getUserData = (id: number) => {
        const reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(profiles[id - 1]);
            }, 1000);
        });
        return reqPromise;
    };

    useEffect(() => {
        if (id !== undefined) {
            getUserData(parseInt(id)).then((res) => {
                setUserData(res as Profile);
            });
        } else {
            setUserData(user);
        }
    }, [user, id]);

    return (
        <Layout>
            {userData !== null ? (
                <div
                    style={{
                        borderRadius: largeRadius,
                        backgroundColor: mainColor
                    }}
                >
                    <ProfileDisplay user={userData} />
                    <ProfileStats
                        player={userData}
                        matches={generateGameResult(userData, 50)}
                    />
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
