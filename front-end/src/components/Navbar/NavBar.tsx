import { Fragment } from "react";

// Components
import Asset from "../Asset";
import Button from "../Button";

// Styling
import { Container, ProfileIconContainer } from "./NavBar.style";

// Navigation
import { Link } from "react-router-dom";

// Authentication hook
import { useAuth } from "../../contexts/AuthContext";

// Links
import { locations } from "./NavBar.config";
import PageRoutes from "../../config/PageRoutes";
import startLogin from "../../proxies/auth/startLogin";
import Logger from "../../utils/Logger";

const CTAButton = ({ authStatus }: { authStatus: boolean }) => {
    const toLoginPage = () => {
        startLogin()
            .then((url) => {
                window.location.assign(url as string);
            })
            .catch((err) =>
                Logger("ERROR", "Navbar", "Req login page url", err)
            );
    };

    return (
        <Fragment>
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
        </Fragment>
    );
};

const NavLinks = ({ authStatus }: { authStatus: boolean }) => (
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

const ProfileIcon = ({ url }: { url: string }) => (
    <Link to={PageRoutes.profile}>
        <ProfileIconContainer>
            <Asset url={url} alt={"profile"} />
        </ProfileIconContainer>
    </Link>
);

const NavBar = () => {
    const { isLoggedIn, user } = useAuth();

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
