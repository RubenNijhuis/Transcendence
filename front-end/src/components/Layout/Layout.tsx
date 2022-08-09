import Footer from "../Footer";
import NavBar from "../Navbar";
import { Container } from "./Layout.style";

type Props = {
    children: JSX.Element;
};

const Layout = ({ children }: Props) => {
    return (
        <Container>
            <NavBar />
            {children}
            <Footer/>
        </Container>
    );
};

export default Layout;
