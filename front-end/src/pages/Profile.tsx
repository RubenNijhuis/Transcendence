import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Authentication
import { useAuth } from "../utils/AuthContext";

const Profile = () => {
    const auth = useAuth();
    console.log(auth.user);
    const { username, email } = auth.user;

    return (
        <Layout>
            <div>
                <Heading type={1}>Profile page</Heading>

                <p>Name: {username}</p>
                {/* <p>Intra name: {intra_name}</p> */}
                <p>E-mail: {email} </p>
                {/* <p>Leaderboard pos: {ranking}</p> */}
            </div>
        </Layout>
    );
};

export default Profile;
