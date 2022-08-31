// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Fragment, useEffect } from "react";
import axios from "axios";

const Home = () => {
    useEffect(() => {
        axios.get("/api/users/seeder");
    }, []);

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Home page</Heading>
            </Fragment>
        </Layout>
    );
};

export default Home;
