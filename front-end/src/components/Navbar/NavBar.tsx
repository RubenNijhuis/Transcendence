// UI
import Asset from "../Asset";
import Button from "../Button";

// Icons
import { FiSettings } from "react-icons/fi";

// Styling
import {
    Container,
    NavLinksContainer,
    ProfileIconContainer
} from "./NavBar.style";

// Navigation
import { Link } from "react-router-dom";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

// Links
import { locations } from "./NavBar.config";
import PageRoutes from "../../config/PageRoutes";

////////////////////////////////////////////////////////////

const SettingsPageButton = () => {
    return (
        <Link to={PageRoutes.settings} className="settings-icon">
            <FiSettings />
        </Link>
    );
};

interface ICTAButton {
    authStatus: boolean;
}

const CTAButton = ({ authStatus }: ICTAButton): JSX.Element => {
    const url = authStatus ? PageRoutes.selectGame : PageRoutes.login;
    const text = authStatus ? "Play pong" : "Login";

    return (
        <Link className="cta-button" to={url}>
            <Button theme={"light"}>{text}</Button>
        </Link>
    );
};

interface INavLink {
    authStatus: boolean;
}

const NavLinks = ({ authStatus }: INavLink): JSX.Element => {
    return (
        <NavLinksContainer>
            {locations.map(({ name, url, onlyWhenLoggedin }, count) => {
                if (onlyWhenLoggedin && !authStatus) return null;
                return (
                    <li key={count}>
                        <Link to={url}>{name}</Link>
                    </li>
                );
            })}
        </NavLinksContainer>
    );
};

interface IProfileIcon {
    url: string;
}

const ProfileIcon = ({ url }: IProfileIcon): JSX.Element => {
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
                        {isLoggedIn && (
                            <>
                                <ProfileIcon url={user!.img_url} />
                                <SettingsPageButton />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default NavBar;
