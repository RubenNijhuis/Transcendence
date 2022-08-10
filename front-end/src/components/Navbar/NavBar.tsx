import Container from "./NavBar.style";

// Navigation
import { Link } from "react-router-dom";
import Button from "../Button";
import { useAuth } from "../../utils/AuthContext";

const locations = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Profile",
        url: "/profile",
    },
];

const NavBar = () => {
    const auth = useAuth();

    return (
        <Container>
            <div className="bar">
                <div className="content">
                    <Link to={"/"} className="logo">
                        <div className="logo">PongHub</div>
                    </Link>
                    <ul>
                        {locations.map(({ name, url }, count) => (
                            <li key={count}>
                                <Link to={url}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                    {auth.user ? (
                        <Link className="login-button" to={"/play"}>
                            <Button theme={"light"}>Play a game</Button>
                        </Link>
                    ) : (
                        <Link className="login-button" to={"/login"}>
                            <Button theme={"light"}>Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default NavBar;
