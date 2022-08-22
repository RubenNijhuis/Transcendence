import { Fragment } from "react";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Authentication
import { useAuth } from "../utils/AuthContext";
import Logger from "../utils/Logger";

const Profile = () => {
    const auth = useAuth();

    Logger("AUTH", "User object", auth.user);

    const { username, email } = auth.user;

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Profile</Heading>

                <p>Name: {username}</p>
                {/* <p>Intra name: {intra_name}</p> */}
                <p>E-mail: {email} </p>
                {/* <p>Leaderboard pos: {ranking}</p> */}
            </Fragment>
        </Layout>
    );
};

export default Profile;
