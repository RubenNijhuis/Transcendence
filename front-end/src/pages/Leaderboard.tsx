import { Fragment, useEffect, useState } from "react";

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
    const [rankings, setRankings] = useState<Profile[] | null>(null);
    const { leaderBoard } = useDataDebug();

    const getRankingList = () => {
        const reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(leaderBoard);
            }, 1000);
        });
        return reqPromise;
    };

    useEffect(() => {
        // Set the ranking list after request
        getRankingList().then((res) => setRankings(res as Profile[]));
    }, []);

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Leaderboard</Heading>
                {rankings !== null ? (
                    <RankingList rankings={rankings} />
                ) : (
                    <Loader />
                )}
            </Fragment>
        </Layout>
    );
};

export default Leaderboard;
