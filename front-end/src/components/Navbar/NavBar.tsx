// UI
import Asset from "../Asset";
import Button from "../Button";

// Styling
import { Container, ProfileIconContainer } from "./NavBar.style";

// Navigation
import { Link } from "react-router-dom";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

// Links
import { locations } from "./NavBar.config";
import PageRoutes from "../../config/PageRoutes";

// Auth
import { getLoginURL } from "../../proxies/auth";

// DEBUG
import Logger from "../../utils/Logger";

// Store
import { setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

////////////////////////////////////////////////////////////

const CTAButton = ({ authStatus }: { authStatus: boolean }): JSX.Element => {
    const toLoginPage = async () => {
        try {
            const url = await getLoginURL();
            setItem(StoreId.loginProcess, true);
            window.location.assign(url);
        } catch (err) {
            Logger("ERROR", "Navbar", "Req login page url", err);
        }
    };

    return (
        <>
            {authStatus ? (
                <Link className="play-button" to={PageRoutes.play}>
                    <Button theme={"light"}>Play Pong</Button>
                </Link>
            ) : (
                <Button
                    className="login-button"
                    theme={"light"}
                    onClick={toLoginPage}
                >
                    Login
                </Button>
            )}
        </>
    );
};

const NavLinks = ({ authStatus }: { authStatus: boolean }): JSX.Element => {
    return (
        <ul>
            {locations.map(({ name, url, onlyWhenLoggedin }, count) => {
                if (onlyWhenLoggedin && !authStatus) return null;
                return (
                    <li key={count}>
                        <Link to={url}>{name}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

const ProfileIcon = ({ url }: { url: string }): JSX.Element => {
    return (
        <Link to={PageRoutes.profile}>
            <ProfileIconContainer>
                <Asset url={url} alt={"profile"} />
            </ProfileIconContainer>
        </Link>
    );
};

const NavBar = (): JSX.Element => {
    const { isLoggedIn } = useAuth();
    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="bar">
                <div className="content">
                    <Link to={PageRoutes.home} className="logo">
                        <div className="logo">PongHub</div>
                    </Link>
                    <NavLinks authStatus={isLoggedIn} />
                    <div className="cta">
                        <CTAButton authStatus={isLoggedIn} />
                        {isLoggedIn && <ProfileIcon url={user!.img_url} />}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NavBar;
