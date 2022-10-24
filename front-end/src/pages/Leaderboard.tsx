// React
import { useEffect, useState } from "react";

// UI
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Podium from "../containers/Leaderboard/Podium";
import RankingList from "../containers/Leaderboard/RankingList";

// DEBUG
import { useFakeData } from "../contexts/FakeDataContext";

// Proxy
import getLeaderboard from "../proxies/leaderboard/getLeaderboard";

// Types
import { ProfileType } from "../types/profile";

const Leaderboard = (): JSX.Element => {
    const [leaderboard, setLeaderboard] = useState<ProfileType[]>(null!);

    ////////////////////////////////////////////////////////////

    const { leaderBoard } = useFakeData();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        setLeaderboard(leaderBoard);
        console.log(leaderBoard);
        // getLeaderboard().then(setLeaderboard).catch(console.log);
    }, []);

    ////////////////////////////////////////////////////////////

    if (leaderBoard === null) return <Loader />;

    return (
        <Layout>
            <Heading type={1}>Leaderboard</Heading>
            {leaderboard === null && <Loader />}
            {leaderboard && (
                <>
                    <Podium rankings={leaderboard} />
                    <RankingList rankings={leaderboard} />
                </>
            )}
        </Layout>
    );
};

export default Leaderboard;
