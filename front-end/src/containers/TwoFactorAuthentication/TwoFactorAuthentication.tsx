// React
import { useEffect, useState, useRef } from "react";

// UI
import Asset from "../../components/Asset";
import Button from "../../components/Button";

// Debug
import Logger, { LogTypes } from "../../modules/Logger";

// Proxies
import { toggle2FA, confirmTFA, getqrTFA } from "../../proxies/auth";

// Styling
import { Container, QrCodeContainer } from "./TwoFactorAuthentication.style";

import { useUser } from "../../contexts/UserContext";

//tfa input
import AuthCode, { AuthCodeRef } from "react-auth-code-input";

import { addImagesToProfile } from "../../proxies/profile";

import * as Profile from "../../types/Profile";

////////////////////////////////////////////////////////////

const TwoFactorAuthentication = ({ user, showToggle}: { user: Profile.Instance, showToggle: boolean} ) => {
    const [QRlink, setQRLink] = useState<string>(null!);
    const [error, setError] = useState<string | null>(null);

    ////////////////////////////////////////////////////////

    const { setUser } = useUser();

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
            const getqrResponse = await getqrTFA();

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
            const userProfile = await confirmTFA(result);
            const updatedProfile = await addImagesToProfile(userProfile, { profile: true, banner: true });
            setUser(updatedProfile);
        } catch (err) {
            setError("Code incorrect");
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////

    return (
        <Container>
            {
                showToggle ? 
                    (<>
                        <Button theme="dark" onClick={handle2faChange}>
                            {user.isTfaEnabled ? "turn off" : "turn on"} on 2fa
                        </Button>
                        <Button theme="dark" onClick={GetTFAqr}>
                            get qr
                            </Button>
                    </>
                    ) : null
            }
            <Button theme="dark" onClick={ConfirmTFA}>
                confirm
            </Button>
            <AuthCode
                allowedCharacters="numeric"
                onChange={handleOnChange}
                ref={AuthInputRef}
            />
            <button onClick={() => AuthInputRef.current?.clear()}>Clear</button>
            <QrCodeContainer>
                {QRlink && <Asset url={QRlink} alt="qr code" />}
            </QrCodeContainer>
            {error !== null ? <span>{error}</span> : null}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default TwoFactorAuthentication;
