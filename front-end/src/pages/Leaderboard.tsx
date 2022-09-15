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
import { useAuth } from "../utils/AuthContext";

// Types
import { Profile } from "../utils/GlobalTypes";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<Profile[]>(null!);

    const { authToken } = useAuth();

    useEffect(() => {
        getLeaderboard(authToken)
            .then((returnedLeaderboard) => {
                setLeaderboard(returnedLeaderboard as Profile[]);
            })
            .catch((err) => {
                console.log(err);
            });
    });

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
