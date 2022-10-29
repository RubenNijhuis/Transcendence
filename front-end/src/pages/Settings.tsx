// UI
import Layout from "../components/Layout";
import Heading from "../components/Heading";
//tfa
import { toggle2FA } from "../proxies/auth"
//user
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { getqrTFA } from "../proxies/auth/getqrTFA";
import Asset from "../components/Asset";
import styled from "styled-components";
import { magicNum } from "../styles/StylingConstants";
import { confirmTFA } from "../proxies/auth/confirmTFA";


const QrCodeContainer = styled.div`
    .asset {
        width: calc(${magicNum} * 3);
        height: calc(${magicNum} * 3);
    }
`;


const SettingsPage = (): JSX.Element => {

    const { user } = useUser();
    const [QRlink, setQRLink] = useState<string>(null!);

    const handle2faChange = async () => {
        try {
            const TFAToggleResponse = await toggle2FA(user.id);

            console.log(TFAToggleResponse);

        } catch (err) {
            console.error(err);
        }
    }

    const GetTFAqr = async () => {
        try {
            const getqrResponse = await getqrTFA(user.id);

            setQRLink(getqrResponse);

        } catch (err) {
            console.error(err);
        }
    }

    const ConfirmTFA = async () => {
        try {
            const input = await confirmTFA(user.id, "798016");

            console.log(input);
            
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => console.log(user), [user]);

    return (
        <Layout>
            <Heading type={1}>Settings page</Heading>
            <button onClick={handle2faChange}>Turn on 2fa</button>
            <button onClick={GetTFAqr}>get qr</button>
            <button onClick={ConfirmTFA}>confirm</button>
            <QrCodeContainer>
                {QRlink && <Asset url={QRlink} alt="qr code" />}
            </QrCodeContainer>
        </Layout>
    );
};

export default SettingsPage;
