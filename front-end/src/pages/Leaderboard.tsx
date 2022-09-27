// React
import { useEffect, useState } from "react";

// UI
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RankingList from "../containers/RankingList";

// Proxy
import getLeaderboard from "../proxies/leaderboard/getLeaderboard";

// Auth
import { useAuth } from "../contexts/AuthContext";

// Types
import { ProfileType } from "../types/profile";
import { RequestErrorType } from "../types/request";

// Debug
import { useModal } from "../contexts/ModalContext";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<ProfileType[]>(null!);
    const { authToken } = useAuth();
    const { setIsModalOpen, setError } = useModal();

    useEffect(() => {
        getLeaderboard()
            .then(setLeaderboard)
            .catch((err: RequestErrorType) => {
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
