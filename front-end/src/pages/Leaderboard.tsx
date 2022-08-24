import { Fragment, useEffect, useState } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RankingList from "../containers/RankingList";

// Debug
import Logger from "../utils/Logger";
import { generateProfile } from "../utils/randomDataGenerator";

const Leaderboard = () => {
    const [rankings, setRankings] = useState<any>(null);

    const getRankingList = () => {
        const reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(generateProfile(10));
            }, 1000);
        });
        return reqPromise;
    };

    useEffect(() => {
        // Set the ranking list after request
        getRankingList()
            .then((res) => setRankings(res))
            .catch((err) => console.error(err));
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
