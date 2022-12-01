// UI
import Asset from "../Asset";
import Button from "../Button";

// Icons
import { FiSettings } from "react-icons/fi";

// Styling
import {
    Container,
    NavLinksContainer,
    ProfileIconContainer,
} from "./NavBar.style";

// Navigation
import { Link } from "react-router-dom";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

// Links
import { locations, NavLink } from "./NavBar.config";
import PageRoutes from "../../config/PageRoutes";
import { useState } from "react";
import DropDown from "../DropDown";

////////////////////////////////////////////////////////////

interface ICTAButton {
    loggedIn: boolean;
}

const CTAButton = ({ loggedIn }: ICTAButton): JSX.Element => {
    const url = loggedIn ? PageRoutes.selectGame : PageRoutes.login;
    const text = loggedIn ? "Play pong" : "Login";

    return (
        <Link className="cta-button" to={url}>
            <Button theme={"light"}>{text}</Button>
        </Link>
    );
};

interface INavLinks {
    loggedIn: boolean;
    links: NavLink[];
}

const NavLinks = ({ loggedIn, links }: INavLinks): JSX.Element => {
    return (
        <NavLinksContainer>
            {links.map(({ name, url, onlyWhenLoggedIn }) => {
                if (onlyWhenLoggedIn && !loggedIn) return null;

                return (
                    <li key={name}>
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

                    <NavLinks loggedIn={isLoggedIn} links={locations} />

                    <div className="cta">
                        <CTAButton loggedIn={isLoggedIn} />
                        {isLoggedIn && (
                            <>
                                <ProfileIcon url={user!.img_url} />
                                <DropDown />
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
