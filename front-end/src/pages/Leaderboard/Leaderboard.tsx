// React
import { useEffect, useState } from "react";

// UI
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import Podium from "../../containers/Leaderboard/Podium";
import RankingList from "../../containers/Leaderboard/RankingList";

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

    useEffect(() => {
        if (leaderboard !== null) return;
        const retrieveLeaderboard = async () => {
            try {
                const retrievedLeaderboard = await getLeaderboard();
                setLeaderboard(retrievedLeaderboard);
            } catch (err) {
                console.error(err);
            }
        };
        retrieveLeaderboard();
    }, []);

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            {leaderboard && (
                <Container>
                    <Heading type={1}>Leaderboard</Heading>
                    <Podium rankings={leaderboard} />
                    <RankingList rankings={leaderboard} />
                </Container>
            )}
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default Leaderboard;
