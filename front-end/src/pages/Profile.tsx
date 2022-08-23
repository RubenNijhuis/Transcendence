import { Fragment, useEffect, useState } from "react";

// Optional url params
import { useParams } from "react-router-dom";

// Components
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import GameHistory from "../containers/GameHistory";
import ProfileDisplay from "../containers/ProfileDisplay";

// Authentication
import { useAuth } from "../utils/AuthContext";

// Debug
import Logger from "../utils/Logger";
import { Profile } from "../utils/GlobalTypes";
import { generateGameResult, generateProfile } from "../utils/randomDataGenerator";

const ProfilePage = () => {
    const [userData, setUserData] = useState<Profile | null>(null);
    const auth = useAuth();
    const { id } = useParams();

    Logger("AUTH", "User object", auth.user);

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
                <Fragment>
                    <ProfileDisplay user={userData} />
                    <GameHistory player={userData} matches={generateGameResult(userData, 50)} />
                </Fragment>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default ProfilePage;
