import { Fragment, useEffect, useState } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RankingList from "../containers/RankingList";
import { useDataDebug } from "../utils/DebugDataContext";
import { Profile } from "../utils/GlobalTypes";

// Debug
import Logger from "../utils/Logger";
import { generateProfile } from "../utils/randomDataGenerator";

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
        getRankingList().then((res) => {
            setRankings(res as Profile[]);
        });
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

/**
 *
 * React
 * View - display data
 *
 * Nestjs
 * Model - user: {username: 'jadjajaj', password: 'dwadwa'}
 * Controller - GET /api/user/jadjajaj
 * - UserController
 *      - findOne(id) -> find in database user by id
 *          return user
 */

export default Leaderboard;
