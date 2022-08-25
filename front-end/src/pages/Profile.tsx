import { Fragment, useEffect, useState } from "react";

// Optional url params
import { useParams } from "react-router-dom";

// Components
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileStats from "../components/ProfileStats";
import GameHistory from "../components/GameHistory";

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
import { largeRadius, mainColor, mediumRadius } from "../utils/StylingConstants";

const ProfilePage = () => {
    const [userData, setUserData] = useState<Profile | null>(null);
    const auth = useAuth();
    const { id } = useParams();

    useEffect(() => {
        if (auth.isLoggedIn)
            Logger("AUTH", "Profile page", "Profile", auth.user);
    }, [auth]);

    const getUserData = (id: number) => {
        const reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(generateProfile(1)[0]);
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
            setUserData(auth.user);
        }
    }, [auth.user, id]);

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
                </div>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default ProfilePage;
