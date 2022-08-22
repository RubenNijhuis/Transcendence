import { Fragment, useEffect, useState } from "react";

// Utils
import { capitalizeString } from "../utils/StringManipulation";

// Optional url params
import { useParams } from "react-router-dom";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import GameHistory from "../containers/GameHistory";

// Authentication
import { useAuth } from "../utils/AuthContext";

// Debug
import Logger from "../utils/Logger";
import { Profile } from "../utils/GlobalTypes";

const temp_profile = {
    username: "Mary",
    email: "contact@rubennijhuis.com",
    ranking: 1,
    img_url: "https://picsum.photos/500/500",
    user_id: 1
};

// Temp data
const game_history = [
    { opponent: temp_profile, score: { opponent: 5, self: 1 } },
    { opponent: temp_profile, score: { opponent: 1, self: 5 } },
    { opponent: temp_profile, score: { opponent: 2, self: 5 } },
    { opponent: temp_profile, score: { opponent: 5, self: 1 } },
    { opponent: temp_profile, score: { opponent: 5, self: 4 } },
    { opponent: temp_profile, score: { opponent: 5, self: 3 } },
    { opponent: temp_profile, score: { opponent: 5, self: 2 } }
];

const ProfilePage = () => {
    const [userData, setUserData] = useState<Profile | null>(null);
    const auth = useAuth();
    const { id } = useParams();

    Logger("AUTH", "User object", auth.user);

    const getUserData = (id: number) => {
        const reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const temp_user: Profile = {
                    username: "Ruben",
                    email: "contact@rubennijhuis.com",
                    ranking: 1,
                    img_url: "https://picsum.photos/500/500",
                    user_id: 1
                };
                resolve(temp_user);
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
            <Fragment>
                {userData !== null ? (
                    <Fragment>
                        <Heading type={1}>
                            {capitalizeString(userData.username)}'s Profile
                        </Heading>
                        <div>
                            <img src={userData.img_url} alt="profile" />
                            <p>Name: {userData.username}</p>
                        </div>
                        {/* <p>Leaderboard pos: {ranking}</p> */}
                        <GameHistory player={userData} matches={game_history} />
                    </Fragment>
                ) : (
                    <Loader />
                )}
            </Fragment>
        </Layout>
    );
};

export default ProfilePage;
