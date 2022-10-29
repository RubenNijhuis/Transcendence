// React
import { useEffect, useState } from "react";

// UI
import Asset from "../../components/Asset";
import Button from "../../components/Button";

// User
import { useUser } from "../../contexts/UserContext";

// Debug
import Logger from "../../modules/Logger";

// Proxies
import { toggle2FA, confirmTFA, getqrTFA } from "../../proxies/auth";

// Styling
import { Container, QrCodeContainer } from "./TwoFactorAuthentication.style";

////////////////////////////////////////////////////////////

const TwoFactorAuthentication = () => {
    const [QRlink, setQRLink] = useState<string>(null!);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const handle2faChange = async () => {
        try {
            const TFAToggleResponse = await toggle2FA(user.uid);

            Logger(
                "TFAToggleResponse",
                "Settings page",
                "Toggle response",
                TFAToggleResponse
            );
        } catch (err) {
            console.error(err);
        }
    };

    const GetTFAqr = async () => {
        try {
            const getqrResponse = await getqrTFA(user.uid);

            setQRLink(getqrResponse);

            console.log(getqrResponse);
        } catch (err) {
            console.error(err);
        }
    };

    const ConfirmTFA = async () => {
        try {
            const input = await confirmTFA(user.uid, "798016");

            Logger(
                "TFAToggleResponse",
                "Settings page",
                "Toggle response",
                input
            );
        } catch (err) {
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////////

    useEffect(() => console.log(user), [user]);

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <Button theme="dark" onClick={handle2faChange}>
                Turn on 2fa
            </Button>
            <Button theme="dark" onClick={GetTFAqr}>
                get qr
            </Button>
            <Button theme="dark" onClick={ConfirmTFA}>
                confirm
            </Button>
            <QrCodeContainer>
                {QRlink && <Asset url={QRlink} alt="qr code" />}
            </QrCodeContainer>
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default TwoFactorAuthentication;
