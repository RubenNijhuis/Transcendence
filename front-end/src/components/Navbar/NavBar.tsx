import { Fragment } from "react";

// Components
import Asset from "../Asset";
import Button from "../Button";

// Styling
import { Container, ProfileIconContainer } from "./NavBar.style";

// Navigation
import { Link } from "react-router-dom";

// Authentication hook
import { useAuth } from "../../utils/AuthContext";

// Links
import { locations } from "./NavBar.config";

const CTAButton = ({ authStatus }: { authStatus: boolean }) => (
    <Fragment>
        {authStatus ? (
            <Link className="login-button" to={"/play"}>
                <Button theme={"light"}>Play Pong</Button>
            </Link>
        ) : (
            <Link className="login-button" to={"/login"}>
                <Button theme={"light"}>Login</Button>
            </Link>
        )}
    </Fragment>
);

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
    <Link to={"/profile/me"}>
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
                    <Link to={"/"} className="logo">
                        <div className="logo">PongHub</div>
                    </Link>
                    <NavLinks authStatus={isLoggedIn} />
                    <div className="cta">
                        <CTAButton authStatus={isLoggedIn} />
                        {isLoggedIn && user && (
                            <ProfileIcon url={user.img_url} />
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NavBar;
