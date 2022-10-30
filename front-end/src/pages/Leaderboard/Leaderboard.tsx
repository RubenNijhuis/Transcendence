// React
import { useEffect, useState } from "react";

// UI
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Podium from "../../containers/Leaderboard/Podium";
import RankingList from "../../containers/Leaderboard/RankingList";

// DEBUG
import { useFakeData } from "../../contexts/FakeDataContext";

// Proxy
import { getLeaderboard } from "../../proxies/leaderboard";

// Types
import { Profile } from "../../types";

// Styling
import { Container } from "./Leaderboard.style";

////////////////////////////////////////////////////////////

const Leaderboard = (): JSX.Element => {
    const [leaderboard, setLeaderboard] = useState<Profile.Instance[]>(null!);

    ////////////////////////////////////////////////////////////

    const { leaderBoard } = useFakeData();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        setLeaderboard(leaderBoard);
        // getLeaderboard().then(setLeaderboard).catch(console.log);
    }, []);

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            {leaderboard ? (
                <Container>
                    <Heading type={1}>Leaderboard</Heading>
                    <Podium rankings={leaderboard} />
                    <RankingList rankings={leaderboard} />
                </Container>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default Leaderboard;
