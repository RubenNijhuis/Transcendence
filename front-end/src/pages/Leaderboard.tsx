import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Authentication
import { useAuth } from "../utils/AuthContext";
import Logger from "../utils/Logger";

const Leaderboard = () => {
    const auth = useAuth();

    // Logger("AUTH", "User object", auth.user);

    return (
        <Layout>
            <div>
                <Heading type={1}>Leaderboard</Heading>
            </div>
        </Layout>
    );
};

export default Leaderboard;
