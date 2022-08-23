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

const CTAButton = ({ authStatus }: any) => (
    <Fragment>
        {/* Change the nav primary button based on login */}
        {authStatus ? (
            <Link className="login-button" to={"/play"}>
                <Button theme={"light"}>Play a game</Button>
            </Link>
        ) : (
            <Link className="login-button" to={"/login"}>
                <Button theme={"light"}>Login</Button>
            </Link>
        )}
    </Fragment>
);

const NavLinks = ({ authStatus }: any) => (
    <ul>
        {locations.map(({ name, url, onlyWhenLoggedin }, count) => {
            // Only show certain items if logged in
            if (onlyWhenLoggedin && !authStatus) return null;
            return (
                <li key={count}>
                    <Link to={url}>{name}</Link>
                </li>
            );
        })}
    </ul>
);

const ProfileIcon = ({ url }: any) => (
    <Link to={"/profile/me"}>
        <ProfileIconContainer>
            <Asset url={url} alt={"profile"} />
        </ProfileIconContainer>
    </Link>
);

const NavBar = () => {
    const { isLoggedIn, user } = useAuth();

    console.log(user);

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
                        {isLoggedIn ? <ProfileIcon url={user.img_url} /> : null}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NavBar;
