// React
import { useState } from "react";

// UI
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";

// Hooks
import { useFormInput } from "../../../components/Form/hooks";

// Proxies
import { verifyPassword } from "../../../proxies/chat";

// Styling
import { PasswordLayer } from "./PasswordInput.style";

////////////////////////////////////////////////////////////

interface IPasswordInput {
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
    chatUid: string;
}

const PasswordInput = ({ chatUid, setIsLocked }: IPasswordInput) => {
    const passwordText = useFormInput("");
    const [passwordError, setPasswordError] = useState<string | null>(null);

    ////////////////////////////////////////////////////////

    const sendPassword = async () => {
        try {
            if (passwordText.value.length === 0) {
                setPasswordError("Password can not be empty");
                return;
            }

            const verifyResponse = await verifyPassword(
                chatUid,
                passwordText.value
            );

            if (verifyResponse === false) {
                setPasswordError("Password is incorrect");
                return;
            }

            setIsLocked(!verifyPassword);
        } catch (err) {
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////

    return (
        <PasswordLayer>
            <Heading type={3}>Please put in the password for this chat</Heading>
            {passwordError && <div className="error">{passwordError}</div>}
            <input type="password" {...passwordText} />
            <Button onClick={sendPassword}>Verify password</Button>
        </PasswordLayer>
    );
};

////////////////////////////////////////////////////////////

export default PasswordInput;
