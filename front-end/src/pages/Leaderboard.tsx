import { Fragment, useEffect, useState } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RankingList from "../containers/RankingList";

// Debug
import Logger from "../utils/Logger";

const list = [
    {
        username: "Ruben",
        id: 1,
        user_id: 3,
        img_url: "https://picsum.photos/200/100"
    },
    {
        username: "Zeno",
        id: 2,
        user_id: 4,
        img_url: "https://picsum.photos/200/500"
    },
    {
        username: "Danai",
        id: 3,
        user_id: 5,
        img_url: "https://picsum.photos/200/300"
    },
    {
        username: "Nathalie",
        id: 4,
        user_id: 6,
        img_url: "https://picsum.photos/400/400"
    },
    {
        username: "Angie",
        id: 5,
        user_id: 7,
        img_url: "https://picsum.photos/100/100"
    },
    {
        username: "David",
        id: 6,
        user_id: 8,
        img_url: "https://picsum.photos/500/500"
    },
    {
        username: "Pissboi",
        id: 7,
        user_id: 10,
        img_url: "https://picsum.photos/300/300"
    }
];

const Leaderboard = () => {
    const [rankings, setRankings] = useState<any>(null);

    const getRankingList = () => {
        const reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(list);
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

export default Leaderboard;
