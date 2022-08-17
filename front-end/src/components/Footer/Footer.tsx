import { Link } from "react-router-dom";
import Container from "./Footer.style";

const Footer = () => {
    return (
        <Container>
            <footer className="footer">
                <div className="heading">
                    <p>A platform for pong fanatics</p>
                </div>
                <div className="links">
                    <div className="inbound">
                        <Link to={"/home"}>Home</Link>
                        <Link to={"/login"}>Login</Link>
                        <Link to={""}>About</Link>
                    </div>
                    <div className="outbound">
                        <a href="https://github.com/rubennijhuis/transcendence" target="_">
                            Github
                        </a>
                    </div>
                </div>
                <div className="rights">
                    <p>2022 • PongHub • All Right reserved.</p>
                </div>
            </footer>
        </Container>
    );
};

export default Footer;
