// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Fragment, useEffect } from "react";
import axios from "axios";

const Home = () => {
<<<<<<< HEAD
    useEffect(() => {
        axios.get("/api/users/seeder");
    }, []);
=======

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
>>>>>>> bbde79032dc61776d43ce98488fab336a6daa71d

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Home page</Heading>
            </Fragment>
        </Layout>
    );
};

export default Home;
