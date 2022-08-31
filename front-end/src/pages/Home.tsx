// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Fragment, useEffect } from "react";

const Home = () => {

    // useEffect(() => {
    //     const user = {
    //         intraID: '123456789',
    //         username: "mberkenb",
    //     }


    //     fetch('/api/users/create', {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(user),
    //     })

    //     setTimeout(() => {

    //         fetch("/api/users/id/mberkenb")
    //             .then(res => res.json())
    //             .then(res => console.log(res));
    //     }, 1000);
    // }, [])

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Home page</Heading>
            </Fragment>
        </Layout>
    );
};

export default Home;
