// React
import { useEffect, useState } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RankingList from "../containers/RankingList";

// Proxy
import getLeaderboard from "../proxies/leaderboard/getLeaderboard";

// Auth
import { useAuth } from "../contexts/AuthContext";

// Types
import { Profile } from "../utils/GlobalTypes";

// Debug
import Logger from "../utils/Logger";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<Profile[]>(null!);

    const { authToken } = useAuth();

    useEffect(() => {
        getLeaderboard(authToken)
            .then((returnedLeaderboard) => {
                setLeaderboard(returnedLeaderboard as Profile[]);
            })
            .catch((err) => {
                Logger("ERROR", "Leaderboard", "leaderboad data", err);
            });
    }, [authToken]);

    return (
        <Layout>
            <Heading type={1}>Leaderboard</Heading>
            {leaderboard !== null ? (
                <RankingList rankings={leaderboard} />
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default Leaderboard;
