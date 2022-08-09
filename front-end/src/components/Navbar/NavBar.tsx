import Container from "./NavBar.style";

// Navigation
import { Link } from "react-router-dom";

const locations = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Login",
        url: "/login",
    },
    {
        name: "About",
        url: "/about",
    },
];

const NavBar = () => {
    return (
        <Container>
            <div className="bar">
                <div className="content">
                    <Link to={'/'}><div className="logo" /></Link>
                    <ul>
                        {locations.map(({ name, url }) => (
                            <li>
                                <Link to={url}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default NavBar;
