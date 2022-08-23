// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Fragment, useEffect } from "react";

const Home = () => {
    return (
    <Layout>
        <Fragment>
            <Heading type={1}>Home page</Heading>
        </Fragment>
    </Layout>)
};

export default Home;
