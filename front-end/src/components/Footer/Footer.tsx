// Routing
import { Link } from "react-router-dom";

// Styling
import Container from "./Footer.style";

// Config
import { InboundLinks, GithubLink } from "./Footer.config";

const Footer = (): JSX.Element => {
    return (
        <Container>
            <footer className="footer">
                <div className="heading">
                    <p>A platform for pong fanatics</p>
                </div>
                <div className="links">
                    <div className="inbound">
                        {InboundLinks.map(({ name, url }, count) => (
                            <Link key={count} to={url}>
                                {name}
                            </Link>
                        ))}
                    </div>
                    <div className="outbound">
                        <a href={GithubLink} target="_">
                            Github
                        </a>
                    </div>
                </div>
                <div className="rights">
                    <p>2022 • PongHub • All Rights reserved.</p>
                </div>
            </footer>
        </Container>
    );
};

export default Footer;
