// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import axios from "axios";

const Home = () => {

    // useEffect(() => {
    //     const user = {
    //         uid: '123456789',
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
            <Heading type={1}>Home page</Heading>
            <Heading type={1}>Home page</Heading>
        </Layout>
    );
};

export default Home;
