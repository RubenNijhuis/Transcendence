// UI
import Layout from "../components/Layout";
import Heading from "../components/Heading";
//tfa
import { toggle2FA } from "../proxies/auth"
//user
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";



const SettingsPage = (): JSX.Element => {

    const { user } = useUser();

    const handle2faChange = async () => {
        try {
            const TFAToggleResponse = await toggle2FA(user.id);

            console.log(TFAToggleResponse);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => console.log(user), [user]);

    return (
        <Layout>
            <Heading type={1}>Settings page for {user.username}</Heading>
            <button onClick={handle2faChange}>Turn on 2fa</button>
        </Layout>
    );
};

export default SettingsPage;
