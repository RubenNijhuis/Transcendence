import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccesfulLogin = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const userRequestProcess = () => {
        const href = window.location.href;
        const token = href.split("?code=")[1];

        // Redirect user to create account if no account has been made
        // Otherwise redirect to profile
        signIn(token).then(
            ({ shouldCreateAccount }: { shouldCreateAccount: boolean }) => {
                if (shouldCreateAccount) {
                    navigate("/create-account");
                } else {
                    navigate("/profile/me");
                }
            }
        );
    };

    useEffect(() => {
        userRequestProcess();
    });

    return (
        <Layout>
            <Heading type={1}>
                Succesfully logged in through the intra API!
            </Heading>
            <p>You will be redirected to your account shortly</p>
            <img
                src="https://media4.giphy.com/media/s2qXK8wAvkHTO/giphy.webp?cid=ecf05e47z3xi18eq8hka0sms71o4o3xkhbhb7i85eo2zkdob&rid=giphy.webp&ct=g"
                alt="celabration"
            />
        </Layout>
    );
};

export default SuccesfulLogin;
