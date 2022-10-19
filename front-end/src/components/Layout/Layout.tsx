// UI
import Footer from "../Footer";
import NavBar from "../Navbar";

// DEBUG
import DebugDevBox from "../../containers/DebugDevBox";
import { debugDevBoxActive } from "../../config/DevEnv";

// Styling
import { Container, Content } from "./Layout.style";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
    return (
        <Container>
            <NavBar />
            <Content>{children}</Content>
            <Footer />
            {debugDevBoxActive && <DebugDevBox />}
        </Container>
    );
};

export default Layout;
