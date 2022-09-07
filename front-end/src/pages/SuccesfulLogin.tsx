import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Logger from "../utils/Logger";
import Axios from "axios";

const SuccesfulLogin = () => {
    const requestUser = () => {
        const href = window.location.href;

        Logger(
            "DEBUG",
            "Succesful login",
            "Parameters",
            href.split("?code=")[1]
        );

        const token = href.split("?code=")[1];
        const url = `/api/auth/confirm?token=${token}`;
        Axios.get(url).then((res) => console.log(res));
    };

    return (
        <Layout>
                <Heading type={1}>You did the thing!</Heading>
                <p>Good job person!</p>
                <img
                    src="https://media4.giphy.com/media/s2qXK8wAvkHTO/giphy.webp?cid=ecf05e47z3xi18eq8hka0sms71o4o3xkhbhb7i85eo2zkdob&rid=giphy.webp&ct=g"
                    alt="celabration"
                />
                <button onClick={requestUser}>SJello</button>
        </Layout>
    );
};

export default SuccesfulLogin;
