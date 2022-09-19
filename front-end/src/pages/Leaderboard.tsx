// React
import { useEffect, useState } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RankingList from "../containers/RankingList";

// Proxy
import getLeaderboard from "../proxies/leaderboard/getLeaderboard";

// Auth
import { useAuth } from "../contexts/AuthContext";

// Types
import { Profile } from "../types/profile";
import { RequestError } from "../types/request";

// Debug
import { useModal } from "../contexts/ModalContext";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<Profile[]>(null!);
    const { authToken } = useAuth();
    const { setIsModalOpen, setError } = useModal();

    useEffect(() => {
        getLeaderboard(authToken)
            .then(setLeaderboard)
            .catch((err: RequestError) => {
                setError(err);
                setIsModalOpen(true);
            });
    }, [authToken, setError, setIsModalOpen]);

    return (
        <Layout>
            <Heading type={1}>Leaderboard</Heading>
            {leaderboard !== null ? (
                <RankingList rankings={leaderboard} />
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default Leaderboard;
