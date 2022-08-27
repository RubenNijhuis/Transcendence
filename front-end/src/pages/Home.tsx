// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Fragment, useEffect } from "react";

const Home = () => {
    useEffect(() => {
        fetch("/api/users/")
            .then((res) => res.json())
            .then((res) => console.log(res));
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
