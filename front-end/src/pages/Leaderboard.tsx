import { useEffect, useState } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RankingList from "../containers/RankingList";

// Data temp
import { useDataDebug } from "../utils/DebugDataContext";

// Types
import { Profile } from "../utils/GlobalTypes";

const Leaderboard = () => {
    const [rankings, setRankings] = useState<Profile[]>(null!);
    const { leaderBoard } = useDataDebug();

    const getRankingList = () => {
        return new Promise((resolve, reject) => resolve(leaderBoard));
    };

    useEffect(() => {
        // Set the ranking list after request
        getRankingList().then((res) => setRankings(res as Profile[]));
    });

    return (
        <Layout>
                <Heading type={1}>Leaderboard</Heading>
                {rankings !== null ? (
                    <RankingList rankings={rankings} />
                ) : (
                    <Loader />
                )}
        </Layout>
    );
};

export default Leaderboard;
