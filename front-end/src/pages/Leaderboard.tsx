// React
import { useEffect, useState } from "react";
import styled from "styled-components";

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
import { magicNum } from "../styles/StylingConstants";

// Types
import { ProfileType } from "../types/profile";

const LeaderboardContainer = styled.div`
    .heading {
        text-align: center;
        margin-bottom: calc(${magicNum} / 2);
    }
`;

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
            {leaderboard === null && <Loader />}
            {leaderboard && (
                <LeaderboardContainer>
                    <Heading type={1}>Leaderboard</Heading>
                    <Podium rankings={leaderboard} />
                    <RankingList rankings={leaderboard} />
                </LeaderboardContainer>
            )}
        </Layout>
    );
};

export default Leaderboard;
