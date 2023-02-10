// React
import { useEffect, useState } from "react";

// UI
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import Podium from "../../containers/Leaderboard/Podium";
import RankingList from "../../containers/Leaderboard/RankingList";
import { useUser } from "../../contexts/UserContext";

// Proxy
import { getLeaderboard } from "../../proxies/leaderboard";

// Types
import * as Profile from "../../types/Profile";

// Styling
import { Container } from "./Leaderboard.style";

////////////////////////////////////////////////////////////

const Leaderboard = (): JSX.Element => {
    const [leaderboard, setLeaderboard] = useState<Profile.Instance[]>(null!);

    ////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;
        const fetchLeaderboard = async () => {
            try {
                const retrievedLeaderboard = await getLeaderboard();
                setLeaderboard(retrievedLeaderboard);
            } catch (err) {
                console.error(err);
            }
        };
        fetchLeaderboard();
    }, [user]);

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            {leaderboard && leaderboard.length >= 3 ? (
                <Container>
                    <Heading type={1}>Leaderboard</Heading>
                    <Podium rankings={leaderboard} />
                    <RankingList rankings={leaderboard} />
                </Container>
            ) : (
                <Heading type={2}>
                    There aren't enough players for a leaderboard yet!
                </Heading>
            )}
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default Leaderboard;
