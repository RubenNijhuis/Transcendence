// UI
import Asset from "../../components/Asset";
import StoreId from "../../config/StoreId";
import { setItem } from "../../modules/Store";
import { getLoginURL } from "../../proxies/auth";

// Style
import { Container } from "./LoginOptions.style";

// Assets
import IntraLogin from "../../assets/login-options/IntraLogin.png";

///////////////////////////////////////////////////////////

const LoginOptions = () => {
    const handleIntraUrl = async () => {
        try {
            const url = await getLoginURL();
            setItem(StoreId.loginProcess, true);
            window.location.assign(url);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <ul className="login-options-list">
                <li className="login-option" onClick={handleIntraUrl}>
                    <Asset url={IntraLogin} alt="intra" />
                    <span>Log in using intra</span>
                </li>

                <li className="login-option">
                    <Asset url={"https://rubennijhuis.com/"} alt="google" />
                    <span>Log in using google</span>
                </li>

                <li className="login-option">
                    <Asset url={"https://rubennijhuis.com/"} alt="github" />
                    <span>Log in using github</span>
                </li>

                <li className="login-option">
                    <Asset url={"https://rubennijhuis.com/"} alt="twitter" />
                    <span>Log in using twitter</span>
                </li>

                <li className="login-option">
                    <Asset url={"https://rubennijhuis.com/"} alt="apple" />
                    <span>Log in using apple</span>
                </li>
            </ul>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default LoginOptions;
