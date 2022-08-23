// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Fragment, useEffect, useState } from "react";

const Home = () => {
    const [data, setData] = useState();

    useEffect(() => {
        fetch("http://localhost:3000/auth/login")
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
