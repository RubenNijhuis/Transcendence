// React
import { useEffect, useState, useRef } from "react"

// UI
import Asset from "../../components/Asset";
import Button from "../../components/Button";

// User
import { useUser } from "../../contexts/UserContext";

// Debug
import Logger, { LogTypes } from "../../modules/Logger";

// Proxies
import { toggle2FA, confirmTFA, getqrTFA } from "../../proxies/auth";

// Styling
import { Container, QrCodeContainer } from "./TwoFactorAuthentication.style";

//tfa input
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';

////////////////////////////////////////////////////////////

const TwoFactorAuthentication = () => {
    const [QRlink, setQRLink] = useState<string>(null!);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////
    
    const [result, setResult] = useState<string>(null!);
    const AuthInputRef = useRef<AuthCodeRef>(null);
    const handleOnChange = (res: any) => {
        setResult(res);
    };

    ///////////////////////////////////////////////////////////

    const handle2faChange = async () => {
        try {
            const TFAToggleResponse = await toggle2FA(user.uid);

            Logger(
                LogTypes.AUTH,
                "Settings page",
                "TFA Toggle Response",
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

            Logger(
                LogTypes.AUTH,
                "Settings page",
                "GetTFAqr response",
                getqrResponse
            );
        } catch (err) {
            console.error(err);
        }
    };


    const ConfirmTFA = async () => {
        try {
            
            const input = await confirmTFA(user.uid, result);

            Logger(
                LogTypes.AUTH,
                "Settings page",
                "Confirm TFA response",
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
            <AuthCode allowedCharacters='numeric' onChange={handleOnChange} ref={AuthInputRef} />
            <button onClick={() => AuthInputRef.current?.clear()}>Clear</button>
            <QrCodeContainer>
                {QRlink && <Asset url={QRlink} alt="qr code" />}
            </QrCodeContainer>
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default TwoFactorAuthentication;