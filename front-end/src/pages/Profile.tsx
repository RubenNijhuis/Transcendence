import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Authentication
import { useAuth } from "../utils/AuthContext";

const Profile = () => {
    const auth = useAuth();
    const { name, intra_name, ranking } = auth.user;

    return (
        <Layout>
            <div>
                <Heading type={1}>Profile page</Heading>

                <p>Name: {name}</p>
                <p>Intra name: {intra_name}</p>
                <p>Leaderboard pos: {ranking}</p>
            </div>
        </Layout>
    );
};

export default Profile;
