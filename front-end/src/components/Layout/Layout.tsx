// UI
import Head from "../Head";
import NavBar from "../Navbar";
import Footer from "../Footer";

// Debug dev box
import DebugDevBox from "../../containers/DebugDevBox";
import { debugDevBoxActive } from "../../config/DevEnv";

// Styling
import { Container, Content } from "./Layout.style";

////////////////////////////////////////////////////////////

interface ILayout {
    children: React.ReactNode;
}

/**
 * Is wrapped around each page. Standardizes the content 
 * that is always on a page
 */
const Layout = ({ children }: ILayout): JSX.Element => {
    return (
        <Container>
            {/* <Head /> */}
            <NavBar />
            <Content>{children}</Content>
            <Footer />
            {debugDevBoxActive && <DebugDevBox />}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default Layout;
