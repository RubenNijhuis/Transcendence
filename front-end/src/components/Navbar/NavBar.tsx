// UI
import Asset from "../Asset";
import Button from "../Button";

import { Buffer } from "buffer";

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

// Types
import { RequestErrorType } from "../../types/request";
import { API } from "../../proxies/instances/apiInstance";
import { useState } from "react";

const CTAButton = ({ authStatus }: { authStatus: boolean }) => {
    const toLoginPage = () => {
        startLogin()
            .then((url: string) => {
                window.location.assign(url);
            })
            .catch((err: RequestErrorType) => {
                Logger("ERROR", "Navbar", "Req login page url", err);
            });
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

const ProfileIcon = ({ url }: { url: string }) => {
    const [imgUrl, setImgUrl] = useState<string>("");

    const reqimg = API.post("/user/get-img", {
        type: "profile",
        username: "LowRes"
    }).then((res) => {
        setImgUrl(Buffer.from(res.data, "binary").toString("base64"));
        console.log(imgUrl, res);
    });

    return (
        <Link to={PageRoutes.profile}>
            <ProfileIconContainer>
                <img
                    src={`data:image/jpg;base64${imgUrl}`}
                    alt="what"
                    width={100}
                    height={100}
                />
                <Asset url={url} alt={"profile"} />
            </ProfileIconContainer>
        </Link>
    );
};

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
